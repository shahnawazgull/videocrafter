import { useState } from "react";

export default function PopupModal({ selectedText, onClose, onSubmit }) {
    const [file, setFile] = useState(null);
    const [topic, setTopic] = useState("");
    const [videoClip, setVideoClip] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        document.getElementById("upload-text").textContent =
            e.target.files[0]?.name || "Choose File";
    };

    const clearFileInput = () => {
        setFile(null);
        document.getElementById("upload-text").textContent = "Choose File";
        document.getElementById("clear-file").style.display = "none";
    };

    const handleTopicChange = (e) => {
        setTopic(e.target.value);
        setVideoClip("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const shouldHighlight = file || (topic && videoClip);
        onSubmit(shouldHighlight);
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <div className="popup-form popup-modal" style={{ display: "flex" }}>
            <div className="popup-container">
                <div className="close-btnx close-btn">
                    <button className="close-popup" onClick={handleClose}>
                        X
                    </button>
                </div>
                <div id="modal-cont">
                    <form
                        className="popup-content"
                        onSubmit={handleSubmit}
                        style={{
                            gridTemplateColumns: "0.7fr 1fr",
                            width: "100%",
                        }}
                    >
                        <br />
                        <input
                            type="hidden"
                            name="csrfmiddlewaretoken"
                            value=""
                            readOnly
                        />
                        <div id="submit-cont">
                            <div className="form-group">
                                <input
                                    id="slide_text"
                                    hidden
                                    name="slide_text"
                                    value={selectedText}
                                    readOnly
                                    className="form-input"
                                />
                            </div>
                            <input
                                id="clipId"
                                type="number"
                                hidden
                                name="clipId"
                                value="2298"
                                readOnly
                            />
                            <input
                                type="text"
                                hidden
                                id="remaining"
                                name="remaining"
                                value="starting with a tingling sensation in my back."
                                readOnly
                            />
                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "0.7fr 1fr",
                                    borderRadius: "8px",
                                    border: "1px solid #00000080",
                                    overflow: "hidden",
                                }}
                                className="form-grid-cont"
                            >
                                <div className="grid-item title form-grid-item begin column-1">
                                    <span
                                        style={{
                                            height: "50px",
                                            alignItems: "center",
                                        }}
                                    >
                                        Upload Scene
                                    </span>
                                </div>
                                <div className="grid-item title form-grid-item end column-2">
                                    <span
                                        style={{
                                            height: "50px",
                                            alignItems: "center",
                                            marginLeft: "-18px",
                                        }}
                                    >
                                        Upload Scene From Assets Folder
                                    </span>
                                </div>
                                <div className="form-grid-item main-item">
                                    <div
                                        className="form-group"
                                        style={{ height: "100%" }}
                                    >
                                        <div className="upload-container">
                                            <label
                                                htmlFor="slide_file"
                                                className="upload-label"
                                            >
                                                <img
                                                    src="images/upload.svg"
                                                    alt=""
                                                    className="uploadSvg"
                                                />
                                                <span id="upload-text">
                                                    Choose File
                                                </span>
                                            </label>
                                            <i
                                                id="clear-file"
                                                style={{
                                                    display: file
                                                        ? "inline"
                                                        : "none",
                                                }}
                                                onClick={clearFileInput}
                                                className="ri-close-circle-line"
                                            ></i>
                                            <input
                                                type="file"
                                                id="slide_file"
                                                name="slide_file"
                                                className="upload-input"
                                                accept="video/*"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        borderLeft: "0.8px solid #864AF9",
                                    }}
                                    className="form-grid-item"
                                >
                                    <div className="form-group">
                                        <select
                                            id="selected_topic"
                                            name="selected_topic"
                                            className="form-select"
                                            value={topic}
                                            onChange={handleTopicChange}
                                        >
                                            <option value="">
                                                Select Topic
                                            </option>
                                            <option value="17">
                                                Male Thinking Clips
                                            </option>
                                            <option value="18">
                                                Male Crying Clips
                                            </option>
                                            <option value="19">
                                                Male Desperation Clips
                                            </option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <select
                                            id="videoSelect"
                                            name="selected_video"
                                            className="form-select"
                                            value={videoClip}
                                            onChange={(e) =>
                                                setVideoClip(e.target.value)
                                            }
                                        >
                                            <option value="" disabled>
                                                Select A Video Clip
                                            </option>
                                            {topic && (
                                                <>
                                                    <option value="clip1">
                                                        Clip 1
                                                    </option>
                                                    <option value="clip2">
                                                        Clip 2
                                                    </option>
                                                </>
                                            )}
                                        </select>
                                        <p
                                            style={{
                                                color: "red",
                                                fontSize: "13px",
                                            }}
                                            id="error-slide"
                                        ></p>
                                    </div>
                                    <input
                                        type="number"
                                        hidden
                                        id="is_tiktok"
                                        name="is_tiktok"
                                        value="0"
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            style={{ alignItems: "end" }}
                            className="form-group"
                        >
                            <button
                                type="submit"
                                id="submit-clip"
                                className="submit-btn"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}