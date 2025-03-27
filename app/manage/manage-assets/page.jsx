"use client"
import React, { useState, useEffect, useRef } from "react";
import ManageHeader from "@/components/Home/ManageHeader";
import "/styles/manage-asset-library.css";

const Page = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // New state for loader
    const menuRef = useRef(null);

    // Toggle menu visibility
    const toggleMenu = (e) => {
        e.stopPropagation();
        setIsMenuOpen((prev) => !prev);
    };

    // Hide menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    // Open modal with loader delay
    const openModal = (e) => {
        e.preventDefault();
        setIsLoading(true); // Show loader
        setTimeout(() => {
            setIsLoading(false); // Hide loader
            setIsModalOpen(true); // Show modal
        }, 1000); // 1-second delay
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Handle form submission with loader
    const handleUploadSubmit = (e) => {
        e.preventDefault();
        setIsModalOpen(false); // Hide modal immediately
        setIsLoading(true); // Show loader
        setTimeout(() => {
            setIsLoading(false); // Hide loader after "upload"
            console.log("Upload submitted");
        }, 1000); // 1-second delay for demo
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
                    display: ${isMenuOpen ? 'block' : 'none'};
                }
            `}</style>

            <ManageHeader />
            <div className="loader"></div>
            <main>
                <div className="content">
                    <div className="box">
                        <div className="boxHeader">
                            <div className="folderpath">
                                <a href="/video/assets/" className="link-tag">
                                    Assets Library
                                </a>
                                <img
                                    src="/images/chewron.svg"
                                    alt="Chevron Icon"
                                />
                            </div>
                            <div className="newFolder">
                                <a
                                    href="/video/upload-folder/"
                                    className="import-folder-link link-tag"
                                    onClick={openModal}
                                >
                                    <img
                                        src="/images/create.svg"
                                        alt="Create Folder Icon"
                                    />
                                    <span style={{ paddingLeft: "5px" }}>
                                        Import Folder
                                    </span>
                                </a>
                            </div>
                        </div>

                        <div className="log">
                            <div className="log-header">
                                <div>
                                    <input
                                        type="checkbox"
                                        name="selectall"
                                        id="selectall"
                                        style={{ opacity: 0 }}
                                    />
                                    <div>Folder Name</div>
                                </div>
                                <div>Items</div>
                                <div>Modified At</div>
                            </div>

                            <div className="log-item" ref={menuRef}>
                                <div>
                                    <input
                                        type="checkbox"
                                        name="selectall"
                                        id="selectall2"
                                        style={{ opacity: 0 }}
                                    />
                                    <div>
                                        <a
                                            href="/video/assets/36/"
                                            className="link-tag"
                                        >
                                            hook_videos (4)
                                        </a>
                                    </div>
                                </div>
                                <div>5</div>
                                <div>Feb. 13, 2025, 2:34 p.m.</div>
                                <img
                                    src="/images/dots.svg"
                                    className="menu"
                                    alt="Menu Options"
                                    onClick={toggleMenu}
                                    style={{ cursor: 'pointer' }}
                                />
                                <div className="actions">
                                    <div>
                                        <a
                                            href="#"
                                            className="rename-folder-link link-tag"
                                        >
                                            <img
                                                src="/images/edit-btn.svg"
                                                alt="Rename Icon" style={{width:'20px'}}
                                            />
                                            
                                            Rename
                                        </a>
                                    </div>
                                    <div>
                                        <a
                                            href="#"
                                            className="delete-folder-link link-tag"
                                            style={{width:'20px'}}
                                        >
                                            <img
                                                src="/images/delete-icn.svg"
                                                alt="Delete Icon"
                                            />
                                            Delete
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Modal Popup */}
            {isModalOpen && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-content">
                        <form
                            method="POST"
                            id="uploadForm"
                            encType="multipart/form-data"
                            onSubmit={handleUploadSubmit}
                        >
                            <input
                                type="hidden"
                                name="csrfmiddlewaretoken"
                                value="QqZr0zhZgc5nUWFY9tVHY0Cl8cL27bpQ6qCZ4twz9MlSBr1DkvQ0AkysQrApBKsm"
                                readOnly
                            />
                            <div className="modal-text">
                                <h2>Upload Folder</h2>
                                <p>Please Make Sure Your Folder Contains Video Clips</p>
                            </div>
                            <input
                                id="fileInput"
                                className="fileUpload"
                                type="file"
                                name="folder"
                                webkitdirectory=""
                                multiple
                            />
                            <input
                                type="text"
                                id="directories"
                                name="directories"
                                hidden
                                value=""
                                readOnly
                            />
                            <input
                                type="text"
                                name="purpose"
                                hidden
                                value="text_file"
                                readOnly
                            />
                            <div>
                                <div className="progressPercent">
                                    <span id="progressPercent">0%</span>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress" id="progressBar"></div>
                                </div>
                            </div>
                            <div
                                id="uploadStatus"
                                style={{ textAlign: "center", marginTop: "12px" }}
                            ></div>
                            <div className="modal-buttons">
                                <button
                                    className="cancel-btn"
                                    type="button"
                                    id="uploadCancelBtn"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="upload-btn"
                                    id="videoUploadButton"
                                    type="submit"
                                >
                                    Upload
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;