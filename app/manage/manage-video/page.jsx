"use client"
import React, { useState, useEffect, useRef } from "react";
import "/styles/manage-asset-library.css";
import Header from "@/components/Home/ManageHeader";

const Page = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Toggle menu visibility
    const toggleMenu = (e) => {
        e.stopPropagation(); // Prevent click from bubbling up
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

    return (
        <div>
            <Header />
            <main>
                <div className="content">
                    <div className="box">
                        <div>
                            <div className="folderpath">
                                <a href="#" className="link-tag">
                                    Recently Processed Videos
                                </a>
                            </div>
                            <div
                                className="newFolder"
                                style={{ padding: "8px" }}
                            >
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

                            <div className="log-item" ref={menuRef}>
                                <div>
                                    <input
                                        type="checkbox"
                                        name="selectall"
                                        id="selectall"
                                        style={{ opacity: 0 }}
                                    />
                                    <div>
                                        <a
                                            href="/text/download_video/347/"
                                            className="link-tag"
                                        >
                                            Id: 347 - If you're struggling to
                                            wake up because of back pain,
                                        </a>
                                    </div>
                                </div>
                                <div>0</div>
                                <div>Feb. 23, 2025, 12:37 p.m.</div>
                                <img
                                    src="/images/dots.svg"
                                    className="menu"
                                    alt="Menu options"
                                    onClick={toggleMenu}
                                    style={{ cursor: 'pointer' }} // Indicate clickable
                                />
                                <div
                                    className="actions"
                                    style={{ display: isMenuOpen ? 'block' : 'none' }}
                                >
                                    <div>
                                        <a
                                            href="/text/delete_textfile/347/"
                                            hx-get="/text/delete_textfile/347/"
                                            hx-target="#confirmation-box"
                                            hx-swap="innerHTML"
                                            className="link-tag"
                                        >
                                            <img
                                                src="/images/delete-icn.svg" // Corrected icon to match "Delete"
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
        </div>
    );
};

export default Page;