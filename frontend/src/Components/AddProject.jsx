import React, { useState } from 'react';

const AddProject = () => {
    const [pid, setPid] = useState('');
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Project Data:', { pid, title, address, description });
        // Here, you would typically send this data to a backend server
        // Reset the form fields after submission
        setPid('');
        setTitle('');
        setAddress('');
        setDescription('');
    };

    return (
        <div>
            <h2>Add Project</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="pid">Project ID:</label>
                    <input
                        type="text"
                        id="pid"
                        value={pid}
                        onChange={(e) => setPid(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="title">Project Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="address">Project Address:</label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="description">Project Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit">Add Project</button>
            </form>
        </div>
    );
};

export default AddProject;
