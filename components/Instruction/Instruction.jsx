"use client";
import React, { useState } from 'react'
import "/styles/style.css";
import "/styles/scene-style.css";
import "/styles/scene.css";
import "/styles/main-scenes.css";
import "/styles/add-scene-style.css";
const Instruction = () => {
    const [tutorialModalOpen, setTutorialModalOpen] = useState(false);
    const [uploadModalOpen, setUploadModalOpen] = useState(false);


    const openModal = (modalId) => {
        if (modalId === "tutorial-video") setTutorialModalOpen(true);
        else setUploadModalOpen(true);
    };
    const closeModal = () => {
        setTutorialModalOpen(false);
        setUploadModalOpen(false);
    };
    const toggleContent = (id, headerElement) => {
        const content = document.getElementById(id);
        const span = headerElement.querySelector("span");
        const otherSections = document.querySelectorAll(".section");
        otherSections.forEach((section) => {
            const header = section.querySelector(".section-header");
            header.style.backgroundColor = "#fff";
            header.style.color = "#6c25be";
        });
        content.classList.toggle("open");
        if (content.classList.contains("open")) {
            span.classList.add("rotate");
            headerElement.style.backgroundColor = "#6c25be";
            headerElement.style.color = "#fff";
        } else {
            span.classList.remove("rotate");
        }
    };
    return (
        <div>
            <div className="grid-container2">
                <div className="section">
                    <div
                        className="section-header"
                        onClick={(e) =>
                            toggleContent("instructions", e.currentTarget)
                        }
                    >
                        Instructions <span>▶</span>
                    </div>
                    <div className="section-content" id="instructions">
                        <div
                            className="bor"
                            style={{ border: "1px solid #cccccc" }}
                        ></div>
                        <h3>Step 1: Upload Your Script</h3>
                        <p>
                            Each line of your script represents a subtitle
                            box in the video. For example:
                        </p>
                        <div className="highlight">
                            <p>
                                If your script says, "Hello, my name is
                                Steve," on the first line of your text file,
                                the first subtitle box will display Hello,
                                my name is Steve.
                            </p>
                        </div>
                        <h3>Step 2: Highlight And Assign Clips</h3>
                        <p className="highlight-words">Highlight words:</p>
                        <p>
                            Simply highlight the words in your script that
                            you want to match with a video clip and assign a
                            video clip.
                        </p>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                openModal("upload-video");
                            }}
                        >
                            Watch Video Tutorial
                        </a>
                    </div>
                </div>

                <div className="section">
                    <div
                        className="section-header"
                        onClick={(e) =>
                            toggleContent("tips", e.currentTarget)
                        }
                    >
                        How To Upload Files To The Asset Folder{" "}
                        <span>▶</span>
                    </div>
                    <div className="section-content" id="tips">
                        <div
                            className="bor"
                            style={{
                                border: "1px solid #cccccc",
                                marginBottom: "1rem",
                            }}
                        ></div>
                        <div
                            className="tips-background"
                            style={{
                                backgroundColor: "#f0f0f0",
                                padding: "4px 20px 20px 20px",
                                lineHeight: "162%",
                            }}
                        >
                            <h3>Step 1</h3>
                            <p>
                                <strong>Create a main folder:</strong>
                            </p>
                            <p>
                                On your computer, create one main folder
                                (e.g., MyVideoAssets). This folder will
                                contain all your subfolders and video clips.
                            </p>
                            <h4>Add Subfolders Inside The Main Folder:</h4>
                            <p>
                                Within the main folder, create subfolders to
                                categorize your videos. For example:
                            </p>
                            <ul>
                                <li>Back Pain Clips</li>
                                <li>Fitness Clips</li>
                                <li>Testimonials</li>
                            </ul>
                            <h4>Add Video Files To Each Subfolder:</h4>
                            <p>
                                Inside each subfolder, add the relevant
                                video clips. For example:
                            </p>
                            <ul className="ul-cl">
                                <li>
                                    Back Pain Clips{" "}
                                    <span style={{ color: "#333" }}></span>{" "}
                                    <span className="vid">
                                        Clip1.mp4, Clip2.mp4
                                    </span>
                                </li>
                                <li>
                                    Fitness Clips{" "}
                                    <span style={{ color: "#333" }}></span>{" "}
                                    <span className="vid">
                                        Workout1.mp4, Workout2.mp4
                                    </span>
                                </li>
                            </ul>
                            <h3>Step 2</h3>
                            <p>
                                <strong>Upload to VideoCrafter.io:</strong>
                            </p>
                            <ul>
                                <li>
                                    Go to the "Upload To Your Asset Folder"
                                    section.
                                </li>
                                <li>
                                    Click "Choose File" and select the main
                                    folder (not individual subfolders).
                                </li>
                                <li>
                                    Click "Upload And Process" to start the
                                    upload.
                                </li>
                            </ul>
                        </div>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                openModal("upload-video");
                            }}
                        >
                            Watch Video Tutorial
                        </a>
                    </div>
                </div>

                {tutorialModalOpen && (
                    <div
                        id="tutorial-modal"
                        className="modal"
                        style={{ display: "block" }}
                    >
                        <div className="modal-content">
                            <span className="close" onClick={closeModal}>
                                ×
                            </span>
                            <iframe
                                src="videos/youtube/youtube1.mp4"
                                frameBorder="0"
                                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                )}

                {uploadModalOpen && (
                    <div
                        id="upload-modal"
                        className="modal"
                        style={{ display: "block" }}
                    >
                        <div className="modal-content">
                            <span className="close" onClick={closeModal}>
                                ×
                            </span>
                            <iframe
                                src="videos/youtube/youtube1.mp4"
                                frameBorder="0"
                                allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Instruction
