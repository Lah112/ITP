import React, { useState, useEffect, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import moment from 'moment'; // Moment.js to format the date

const CommentReport = () => {
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]); // Filtered comments based on search
  const [searchCommenter, setSearchCommenter] = useState(''); // Search query for commenter
  const [startDate, setStartDate] = useState(''); // Start date for date range
  const [endDate, setEndDate] = useState(''); // End date for date range
  const pageRef = useRef();

  useEffect(() => {
    // Fetch all comments data
    fetch('http://localhost:3005/api/posts/comment')
      .then((response) => response.json())
      .then((data) => {
        setComments(data.data); // Set comments based on API response
        setFilteredComments(data.data); // Initially set filtered comments to all comments
      })
      .catch((error) => console.error('Error fetching comment report:', error));
  }, []);

  // Filter comments based on search and date range
  useEffect(() => {
    let filtered = comments;

    // Filter by commenter's name
    if (searchCommenter) {
      filtered = filtered.filter((comment) =>
        comment.commentedBy.toLowerCase().includes(searchCommenter.toLowerCase())
      );
    }

    // Filter by date range
    if (startDate && endDate) {
      filtered = filtered.filter((comment) => {
        const commentDate = moment(comment.createdAt);
        return (
          commentDate.isSameOrAfter(moment(startDate)) &&
          commentDate.isSameOrBefore(moment(endDate))
        );
      });
    }

    setFilteredComments(filtered);
  }, [searchCommenter, startDate, endDate, comments]);

  const downloadPdf = () => {
    const element = pageRef.current;
    html2pdf().from(element).save();
  };

  // Handle validations for date range (disable future dates)
  const handleStartDateChange = (e) => {
    const selectedDate = e.target.value;
    if (moment(selectedDate).isAfter(moment())) {
      alert('Start date cannot be in the future.');
      return;
    }
    setStartDate(selectedDate);
  };

  const handleEndDateChange = (e) => {
    const selectedDate = e.target.value;
    if (moment(selectedDate).isAfter(moment())) {
      alert('End date cannot be in the future.');
      return;
    }
    if (startDate && moment(selectedDate).isBefore(moment(startDate))) {
      alert('End date cannot be earlier than the start date.');
      return;
    }
    setEndDate(selectedDate);
  };

  return (
    <div>
      <div
        ref={pageRef}
        id="page-content"
        style={{
          maxWidth: '1100px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '0 auto',
        }}
      >
        <h1 style={{ textAlign: 'center' }}>Post Report</h1>

        {/* Search and Date Filters */}
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search by Commenter"
            value={searchCommenter}
            onChange={(e) => setSearchCommenter(e.target.value)}
            style={{
              padding: '8px',
              marginRight: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
            }}
          />
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            max={moment().format('YYYY-MM-DD')} // Disable future dates
            style={{
              padding: '8px',
              marginRight: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
            }}
          />
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            max={moment().format('YYYY-MM-DD')} // Disable future dates
            style={{
              padding: '8px',
              marginRight: '10px',
              borderRadius: '8px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        {/* Comments Table */}
        <table
          style={{
            width: '100%',
            maxWidth: '1000px', // Set max width
            margin: '0 auto',
            borderCollapse: 'collapse',
            marginTop: '20px',
          }}
        >
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '8px' }}>Commenter</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Comment</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Replies</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredComments.map((comment) => (
              <tr key={comment._id}>
                <td style={{ border: '1px solid black', padding: '8px' }}>
                  {comment.commentedBy}
                </td>
                <td style={{ border: '1px solid black', padding: '8px' }}>
                  {comment.commentBody}
                </td>
                <td style={{ border: '1px solid black', padding: '8px' }}>
                  {comment.replies.length > 0
                    ? comment.replies.map((reply) => (
                        <div key={reply._id}>
                          <strong>{reply.repliedBy}:</strong> {reply.replyBody}
                        </div>
                      ))
                    : 'No Replies'}
                </td>
                <td style={{ border: '1px solid black', padding: '8px' }}>
                  {moment(comment.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      >
        <button
          style={{
            backgroundColor: '#FF5700',
            padding: '6px 8px',
            borderRadius: '12px',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
          }}
          onClick={downloadPdf}
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default CommentReport;
