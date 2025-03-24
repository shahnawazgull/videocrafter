"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Header from "@/components/Home/Header";
import ProgressBar from "@/components/Home/ProgressBar";
import "video.js/dist/video-js.css";
import "/styles/bg-music-selection.css";

const Page = () => {
    const [mp3Templates, setMp3Templates] = useState([
        { id: 1, file: null, startTime: "", endTime: "", volume: 50 },
        { id: 2, file: null, startTime: "", endTime: "", volume: 50 },
    ]);

    const videoRef = useRef(null);
    const playerRef = useRef(null);

    // ... (keeping your existing useEffect for video player unchanged)

    const handleAddMp3 = () => {
        const newId = mp3Templates.length + 1;
        setMp3Templates([
            ...mp3Templates,
            {
                id: newId,
                file: null,
                startTime: "",
                endTime: "",
                volume: 50,
            },
        ]);
    };

    const handleDeleteMp3 = (id) => {
        if (mp3Templates.length > 1) {
            const updatedTemplates = mp3Templates
                .filter((template) => template.id !== id)
                .map((template, index) => ({
                    ...template,
                    id: index + 1,
                }));
            setMp3Templates(updatedTemplates);
        }
    };

    const handleClearFile = (id) => {
        const updatedTemplates = mp3Templates.map((template) =>
            template.id === id ? { ...template, file: null } : template
        );
        setMp3Templates(updatedTemplates);
    };

    const formatTimeInput = (value) => {
        let cleaned = value.replace(/\D/g, '');
        cleaned = cleaned.slice(0, 4);
        if (cleaned.length > 2) {
            return `${cleaned.slice(0, 2)}:${cleaned.slice(2)}`;
        }
        return cleaned;
    };

    const handleTimeChange = (id, field, e) => {
        const formattedValue = formatTimeInput(e.target.value);
        handleInputChange(id, field, formattedValue);
    };

    const handleInputChange = (id, field, value) => {
        const updatedTemplates = mp3Templates.map((template) =>
            template.id === id ? { ...template, [field]: value } : template
        );
        setMp3Templates(updatedTemplates);
    };

    const handleFileChange = (id, event) => {
        const file = event.target.files[0];
        handleInputChange(id, "file", file);
    };

    return (
        <div className="bg">
            <Header />
            <ProgressBar />
            <div className="content bg-content">
                <div className="bg-content-sub">
                    <div className="cont">
                        <div className="cont-sub">
                            <Link href="/scene" className="bg-button">
                                <span>Go Back To Change Scenes</span>
                            </Link>
                        </div>
                        <div className="bg-heading">
                            <span className="bg-heading-span">
                                Select Your Background Music
                            </span>
                        </div>
                    </div>
                    <div className="bg-video">
                        <div id="video-container-box">
                            <div id="videoPreviewContainer">
                                <video
                                    ref={videoRef}
                                    id="my-video"
                                    className="video-js vjs-default-skin vjs-big-play-centered"
                                    controls
                                    preload="auto"
                                >
                                    <source
                                        src="videos/youtube/youtube1.mp4"
                                        type="video/mp4"
                                    />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    </div>
                    <form method="POST" id="bg_form" encType="multipart/form-data">
                        <div className="file-upload-container" id="targetDiv">
                            <div id="musicContainer">
                                {mp3Templates.map((template) => (
                                    <div key={template.id} className="uploadmp3">
                                        {/* ... (keeping uploadmp3-sub and delete button) */}
                                        <div className="file-input-container">
                                            <div className="choose-file-sty">
                                                <img src="/images/upload-icon.svg" alt="" />
                                                <input
                                                    className="fileInput"
                                                    name={`bg_music_${template.id}`}
                                                    type="file"
                                                    accept="audio/mpeg"
                                                    onChange={(e) => handleFileChange(template.id, e)}
                                                />
                                                <div className="output">
                                                    {template.file ? template.file.name : "Choose File"}
                                                </div>
                                                {template.file && (
                                                    <button
                                                        type="button"
                                                        className="clear-btn"
                                                        onClick={() => handleClearFile(template.id)}
                                                    >
                                                        ×
                                                    </button>
                                                )}
                                            </div>

                                        </div>
                                        <div className="bg-text">
                                            <span>
                                                What Second Should This MP3 Play From?{" "}
                                                <span className="text-span">In Minutes</span>
                                            </span>
                                        </div>
                                        <div className="start-main-div">
                                            <div className="start-sub-div">
                                                <span className="text start-text">Start:</span>
                                                <input
                                                    type="text"
                                                    placeholder="00:00"
                                                    className="time startTime"
                                                    name={`from_when_${template.id}`}
                                                    value={template.startTime}
                                                    onChange={(e) => handleTimeChange(template.id, "startTime", e)}
                                                    maxLength="5"
                                                />
                                            </div>
                                            <div className="start-sub-div">
                                                <span className="text start-text">End:</span>
                                                <input
                                                    type="text"
                                                    placeholder="00:00"
                                                    className="time endTime"
                                                    name={`to_when_${template.id}`}
                                                    value={template.endTime}
                                                    onChange={(e) => handleTimeChange(template.id, "endTime", e)}
                                                    maxLength="5"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="Font-Size-text">
                                                <div className="mp3-volume">
                                                    MP3 {template.id} Volume:
                                                </div>
                                                <span className="volume-percentage">{template.volume}%</span>
                                            </div>
                                            <div className="Font-Size-Slider">
                                                <input
                                                    type="range"
                                                    name={`bg_level_${template.id}`}
                                                    min="0"
                                                    max="100"
                                                    value={template.volume}
                                                    className="slider"
                                                    onChange={(e) => {
                                                        handleInputChange(
                                                            template.id,
                                                            "volume",
                                                            parseInt(
                                                                e.target.value
                                                            )
                                                        );
                                                        e.target.style.setProperty(
                                                            "--value",
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    id="addMusicBtn"
                                    className="button"
                                    onClick={handleAddMp3}
                                >
                                    <img src="/images/add.svg" alt="" />
                                    Upload Another MP3
                                </button>
                                <div id="proceed">
                                    <a
                                        href="/download-scene"
                                        className="button button-proceed"
                                    >
                                        Proceed Without Background Music
                                        <img src="/images/arrow.svg" alt="" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Page;