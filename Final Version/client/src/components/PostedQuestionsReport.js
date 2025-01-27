import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../styles/PostedQuestionsReport.css';
import logo from '../assets/rocketman.svg';
import { FaTimes } from 'react-icons/fa'; // Importing an icon for clearing the input

const PostedQuestionsReport = () => {
    const [postedQuestions, setPostedQuestions] = useState([]);
    const [isReportVisible, setIsReportVisible] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: 'title', direction: 'ascending' });
    const [searchQuery, setSearchQuery] = useState('');

    const fetchPostedQuestionsSummary = async () => {
        try {
            const response = await axios.get('/api/report/posted-questions-summary');
            setPostedQuestions(response.data);
            setIsReportVisible(true);
        } catch (error) {
            console.error('Error fetching posted questions summary:', error);
        }
    };

    const downloadPDF = () => {
        const doc = new jsPDF();
        const tableColumn = ["Title", "Created At", "Author"];
        const tableRows = postedQuestions.map(question => [
            question.title,
            new Date(question.createdAt).toLocaleString(),
            question.author,
        ]);
        doc.text("Posted Questions Summary Report", 14, 15);
        doc.autoTable(tableColumn, tableRows, { startY: 20 });
        doc.save("posted_questions_summary_report.pdf");
    };

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedQuestions = React.useMemo(() => {
        let sortableQuestions = [...postedQuestions];
        if (sortConfig !== null) {
            sortableQuestions.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableQuestions;
    }, [postedQuestions, sortConfig]);

    // Filtered questions based on the search query
    const filteredQuestions = sortedQuestions.filter(question =>
        question.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="premium-report-container">
            <h1 className="premium-report-title">Posted Questions Summary Report</h1>
            <div className="premium-button-container">
                <button className="premium-btn-view" onClick={fetchPostedQuestionsSummary}>View Posted Questions Report</button>
                {isReportVisible && (
                    <button className="premium-btn-download" onClick={downloadPDF}>Download Report as PDF</button>
                )}
            </div>

            {/* Search Bar */}
            {isReportVisible && (
                <div className="premium-search-container">
                    <div className="premium-search-input">
                        <input
                            type="text"
                            className="premium-search-bar"
                            placeholder="Search questions by title..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {/* Clear Icon */}
                        {searchQuery && (
                            <FaTimes className="clear-icon" onClick={() => setSearchQuery('')} />
                        )}
                    </div>
                </div>
            )}

            {isReportVisible && (
                <div className="premium-report-content">
                    <table className="premium-styled-table">
                        <thead>
                            <tr>
                                <th onClick={() => requestSort('title')} sort-direction={sortConfig.key === 'title' ? sortConfig.direction : null}>
                                    Title
                                </th>
                                <th onClick={() => requestSort('createdAt')} sort-direction={sortConfig.key === 'createdAt' ? sortConfig.direction : null}>
                                    Created At
                                </th>
                                <th onClick={() => requestSort('author')} sort-direction={sortConfig.key === 'author' ? sortConfig.direction : null}>
                                    Author
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredQuestions.map((question, index) => (
                                <tr key={index} className="premium-table-row">
                                    <td>{question.title}</td>
                                    <td>{new Date(question.createdAt).toLocaleString()}</td>
                                    <td>{question.author}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PostedQuestionsReport;
