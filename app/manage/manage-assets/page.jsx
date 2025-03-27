"use client"
import React, { useState, useEffect, useRef, useCallback } from "react";
import ManageHeader from "@/components/Home/ManageHeader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "/styles/manage-asset-library.css";

const Page = () => {
    const [activeMenuId, setActiveMenuId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [folders, setFolders] = useState([{
        id: 1,
        name: "hook_videos (4)",
        items: 5,
        modified: "Feb. 13, 2025, 2:34 p.m."
    }]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [renamingFolderId, setRenamingFolderId] = useState(null);
    const [newFolderName, setNewFolderName] = useState("");
    const menuRef = useRef(null);
    const fileInputRef = useRef(null);
    const timeoutRef = useRef(null);

    const toggleMenu = useCallback((e, folderId) => {
        e.stopPropagation();
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        
        timeoutRef.current = setTimeout(() => {
            setActiveMenuId(prev => prev === folderId ? null : folderId);
        }, 150);
    }, []);

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

    const openModal = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
        setUploadProgress(0);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setUploadProgress(0);
    };

    const handleUploadSubmit = (e) => {
        e.preventDefault();
        const files = fileInputRef.current?.files;
        if (!files || files.length === 0) return;

        setIsLoading(true);
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setUploadProgress(Math.min(progress, 100));
            if (progress >= 100) {
                clearInterval(interval);
                const newFolder = {
                    id: Date.now(),
                    name: files[0].webkitRelativePath.split('/')[0],
                    items: files.length,
                    modified: new Date().toLocaleString()
                };
                setFolders(prev => [...prev, newFolder]);
                setIsLoading(false);
                setIsModalOpen(false);
            }
        }, 200);
    };

    const startRename = (folderId, currentName) => {
        setRenamingFolderId(folderId);
        setNewFolderName(currentName);
        setActiveMenuId(null);
    };

    const handleRenameSubmit = (folderId) => {
        if (newFolderName.trim() === "") return;
        setFolders(prev => prev.map(folder =>
            folder.id === folderId ? { ...folder, name: newFolderName } : folder
        ));
        setRenamingFolderId(null);
        toast.success("Folder renamed successfully!", {
            position: "top-right",
            autoClose: 3000,
        });
    };

    const deleteFolder = (folderId) => {
        setActiveMenuId(null);
        if (window.confirm("Are you sure you want to delete this folder?")) {
            setIsLoading(true);
            setTimeout(() => {
                setFolders(prev => prev.filter(folder => folder.id !== folderId));
                setIsLoading(false);
                toast.success("Folder deleted successfully!", {
                    position: "top-right",
                    autoClose: 3000,
                });
            }, 1000);
        }
    };

    return (
        <div>
            <style jsx>{`
                .loader {
                    display: ${isLoading ? 'block' : 'none'};
                    position: fixed;
                    z-index: 9999;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 50px;
                    height: 50px;
                    border: 5px solid #f3f3f3;
                    border-top: 5px solid #9662f9;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    0% { transform: translate(-50%, -50%) rotate(0deg); }
                    100% { transform: translate(-50%, -50%) rotate(360deg); }
                }

                .video-card {
                    max-width: 400px;
                    padding: 20px;
                    border-radius: 10px;
                    background-color: #f2f2f2;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column;
                }

                .actions {
                    display: ${activeMenuId ? 'block' : 'none'};
                    position: absolute;
                    right: 20px;
                    background: white;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    padding: 5px;
                }

                .progress-bar {
                    width: 100%;
                    height: 10px;
                    background: #f0f0f0;
                    border-radius: 5px;
                }
                .progress {
                    width: ${uploadProgress}%;
                    height: 100%;
                    background: #9662f9;
                    transition: width 0.3s ease;
                }

                .rename-input {
                    padding: 6px 10px;
                    border: 2px solid #9662f9;
                    border-radius: 4px;
                    font-size: 14px;
                    width: 200px;
                    outline: none;
                    transition: all 0.3s ease;
                }

                .rename-input:focus {
                    border-color: #7a4ed9;
                    box-shadow: 0 0 5px rgba(150, 98, 249, 0.3);
                }
            `}</style>

            <ManageHeader />
            <div className="loader"></div>
            <ToastContainer />
            <main>
                <div className="content">
                    <div className="box">
                        <div className="boxHeader">
                            <div className="folderpath">
                                <a href="#" className="link-tag">Assets Library</a>
                                <img src="/images/chewron.svg" alt="Chevron Icon" />
                            </div>
                            <div className="newFolder">
                                <a href="#" className="import-folder-link link-tag" onClick={openModal}>
                                    <img src="/images/create.svg" alt="Create Folder Icon" />
                                    <span style={{ paddingLeft: "5px" }}>Import Folder</span>
                                </a>
                            </div>
                        </div>

                        <div className="log">
                            <div className="log-header">
                                <div><input type="checkbox" name="selectall" id="selectall" style={{ opacity: 0 }} />Folder Name</div>
                                <div>Items</div>
                                <div>Modified At</div>
                            </div>

                            {folders.map(folder => (
                                <div className="log-item" key={folder.id} ref={menuRef}>
                                    <div>
                                        <input type="checkbox" name="selectall" id="selectall2" style={{ opacity: 0 }} />
                                        <div>
                                            {renamingFolderId === folder.id ? (
                                                <input
                                                    type="text"
                                                    className="rename-input"
                                                    value={newFolderName}
                                                    onChange={(e) => setNewFolderName(e.target.value)}
                                                    onBlur={() => handleRenameSubmit(folder.id)}
                                                    onKeyPress={(e) => e.key === 'Enter' && handleRenameSubmit(folder.id)}
                                                    autoFocus
                                                />
                                            ) : (
                                                <a href="#" className="link-tag">{folder.name}</a>
                                            )}
                                        </div>
                                    </div>
                                    <div>{folder.items}</div>
                                    <div>{folder.modified}</div>
                                    <img
                                        src="/images/dots.svg"
                                        className="menu"
                                        alt="Menu Options"
                                        onClick={(e) => toggleMenu(e, folder.id)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                    {activeMenuId === folder.id && (
                                        <div className="actions">
                                            <div>
                                                <a
                                                    href="#"
                                                    className="rename-folder-link link-tag"
                                                    onClick={() => startRename(folder.id, folder.name)}
                                                >
                                                    <img src="/images/edit-btn.svg" alt="Rename Icon" style={{width:'20px'}} />
                                                    Rename
                                                </a>
                                            </div>
                                            <div>
                                                <a
                                                    href="#"
                                                    className="delete-folder-link link-tag"
                                                    onClick={() => deleteFolder(folder.id)}
                                                >
                                                    <img src="/images/delete-icn.svg" alt="Delete Icon" style={{width:'20px'}} />
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

            {isModalOpen && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-content">
                        <form onSubmit={handleUploadSubmit}>
                            <input type="hidden" name="csrfmiddlewaretoken" value="..." />
                            <div className="modal-text">
                                <h2>Upload Folder</h2>
                                <p>Please Make Sure Your Folder Contains Video Clips</p>
                            </div>
                            <input
                                ref={fileInputRef}
                                className="fileUpload"
                                type="file"
                                name="folder"
                                webkitdirectory=""
                                multiple
                            />
                            <div>
                                <div className="progressPercent">
                                    <span id="progressPercent">{uploadProgress}%</span>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress" id="progressBar"></div>
                                </div>
                            </div>
                            <div className="modal-buttons">
                                <button type="button" className="cancel-btn" onClick={closeModal}>Cancel</button>
                                <button type="submit" className="upload-btn">Upload</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;