"use client"
import React, { useState, useEffect, useRef, useCallback } from "react";
import "/styles/manage-asset-library.css";
import Header from "@/components/Home/ManageHeader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
    const [activeMenuId, setActiveMenuId] = useState(null);
    const [files, setFiles] = useState([{
        id: 347,
        name: "Id: 347 - If you're struggling to wake up because of back pain,",
        clips: 0,
        created: "Feb. 23, 2025, 12:37 p.m."
    }]);
    const menuRef = useRef(null);
    const timeoutRef = useRef(null);

    // Debounced menu toggle
    const toggleMenu = useCallback((e, fileId) => {
        e.stopPropagation();
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        
        timeoutRef.current = setTimeout(() => {
            setActiveMenuId(prev => prev === fileId ? null : fileId);
        }, 150);
    }, []);

    // Hide menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setActiveMenuId(null);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    // Delete functionality
    const deleteFile = (fileId) => {
        setActiveMenuId(null);
        if (window.confirm("Are you sure you want to delete this file?")) {
            setFiles(prev => prev.filter(file => file.id !== fileId));
            toast.success("File deleted successfully!", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    return (
        <div>
            <style jsx>{`
                .actions {
                    display: ${activeMenuId ? 'block' : 'none'};
                    position: absolute;
                    right: 20px;
                    background: white;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    padding: 5px;
                }
            `}</style>

            <Header />
            <ToastContainer />
            <main>
                <div className="content">
                    <div className="box">
                        <div>
                            <div className="folderpath">
                                <a href="#" className="link-tag">
                                    Recently Processed Videos
                                </a>
                            </div>
                            <div className="newFolder" style={{ padding: "8px" }}>
                                {/* Uncomment to add functionality */}
                                {/* 
                  <a>
                    <img src="https://vlsmlsaker.s3.amazonaws.com/resources/assets/assets1/create.svg" alt="" />
                    <span style={{ paddingLeft: '5px' }}>Import Folder</span>
                  </a>
                */}
                            </div>
                        </div>

                        <div className="log">
                            <div>
                                <div>
                                    <input
                                        type="checkbox"
                                        name="selectall"
                                        id="selectall"
                                        style={{ opacity: 0 }}
                                    />
                                    <div>Text Files</div>
                                </div>
                                <div>Clips</div>
                                <div>Created At</div>
                            </div>

                            {files.map(file => (
                                <div className="log-item" key={file.id} ref={menuRef}>
                                    <div>
                                        <input
                                            type="checkbox"
                                            name="selectall"
                                            id="selectall"
                                            style={{ opacity: 0 }}
                                        />
                                        <div>
                                            <a href={`/text/download_video/${file.id}/`} className="link-tag">
                                                {file.name}
                                            </a>
                                        </div>
                                    </div>
                                    <div>{file.clips}</div>
                                    <div>{file.created}</div>
                                    <img
                                        src="/images/dots.svg"
                                        className="menu"
                                        alt="Menu options"
                                        onClick={(e) => toggleMenu(e, file.id)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                    {activeMenuId === file.id && (
                                        <div className="actions">
                                            <div>
                                                <a
                                                    href="#"
                                                    className="link-tag"
                                                    onClick={() => deleteFile(file.id)}
                                                >
                                                    <img
                                                        src="/images/delete-icn.svg"
                                                        alt="Delete Icon"
                                                        style={{width:'20px'}}
                                                    />
                                                    Delete
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Page;