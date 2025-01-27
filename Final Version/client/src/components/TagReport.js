import React, { useState, useEffect, useRef } from 'react';
import html2pdf from 'html2pdf.js';
import moment from 'moment'; // Moment.js to format the date

const TagReport = () => {
  const [posts, setPosts] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' }); // Default sort by date descending
  const pageRef = useRef();

  useEffect(() => {
    // Fetch all posts data
    fetch('http://localhost:3005/api/posts/tag-report')
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error('Error fetching tag report:', error));
  }, []);

  const sortedPosts = React.useMemo(() => {
    let sortablePosts = [...posts];
    if (sortConfig !== null) {
      sortablePosts.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortablePosts;
  }, [posts, sortConfig]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const downloadPdf = () => {
    const element = pageRef.current;
    html2pdf().from(element).save();
  };

  return (
    <div>
      <div ref={pageRef} id="page-content" style={{maxWidth:"1100px",display:'flex',flexDirection:'column',alignItems:'center',margin:"0 auto"}}>
        <h1 style={{ textAlign: 'center' }}>All Posts Tag Report</h1>
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
              <th
                style={{ border: '1px solid black', padding: '8px', cursor: 'pointer' }}

              >
                Post Title
              </th>
              <th
                style={{ border: '1px solid black', padding: '8px', cursor: 'pointer' }}
  
              >
                Category 
              </th>
              <th
                style={{ border: '1px solid black', padding: '8px', cursor: 'pointer' }}
      
              >
                Number of Tags 
              </th>
              <th
                style={{ border: '1px solid black', padding: '8px', cursor: 'pointer' }}
     
              >
                Tags
              </th>
              <th
                style={{ border: '1px solid black', padding: '8px', cursor: 'pointer' }}
                onClick={() => handleSort('createdAt')}
              >
                Created At {sortConfig.key === 'createdAt' &&(sortConfig.direction === 'asc' ? <span style={{ color: '#FF5700',fontSize:"1.2rem",fontWeight:"bolder" }}>↑</span> : <span style={{ color: '#FF5700',fontSize:"1.2rem",fontWeight:"bolder" }}>↓</span>)}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedPosts.map((post) => (
              <tr key={post._id}>
                <td style={{ border: '1px solid black', padding: '8px' }}>{post.title}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{post.category}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{post.tags.length}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{post.tags.join(', ')}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>
                  {moment(post.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
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

export default TagReport;
