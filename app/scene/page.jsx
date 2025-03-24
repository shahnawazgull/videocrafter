"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Script from "next/script";
import "/styles/style.css";
import "/styles/scene-style.css";
import "/styles/scene.css";
import "/styles/main-scenes.css";
import "/styles/add-scene-style.css";
import Header from "@/components/Home/Header";
import ProgressBar from "@/components/Home/ProgressBar";
import Link from "next/link";
import PopupModal from "@/components/PopupModal/PopupModal";

export default function Home() {
    const [tutorialModalOpen, setTutorialModalOpen] = useState(false);
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [scriptFile, setScriptFile] = useState(null);
    const [scriptFileName, setScriptFileName] = useState("No file chosen");
    const [folderFiles, setFolderFiles] = useState(null);
    const [folderFileName, setFolderFileName] = useState("No folder chosen");
    const [slides, setSlides] = useState([
        {
            id: 1,
            subtitle: "Subtitle 1",
            text: "",
            markedText: "",
            originalText: "",
            isEditing: true,
        },
    ]);
    const [slideCount, setSlideCount] = useState(1);
    const [isPfpDropdownOpen, setIsPfpDropdownOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const [selectedSlideId, setSelectedSlideId] = useState(null);
    const [selectedText, setSelectedText] = useState("");
    const [activeSlideIds, setActiveSlideIds] = useState(new Set([1]));
    const [isProcessing, setIsProcessing] = useState(false);
    const [dotCount, setDotCount] = useState(0);
    const tableRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
        if (tableRef.current) {
            tableRef.current.scrollIntoView({ behavior: "smooth" });
        }
        const initialActiveIds = new Set(
            slides.filter(slide => slide.isEditing).map(slide => slide.id)
        );
        setActiveSlideIds(initialActiveIds);
    }, [slides]);

    useEffect(() => {
        if (isProcessing) {
            const interval = setInterval(() => {
                setDotCount((prev) => (prev + 1) % 4);
            }, 500);
            return () => clearInterval(interval);
        }
    }, [isProcessing]);

    useEffect(() => {
        if (isMounted && typeof window !== "undefined" && window.$) {
            const $ = window.$;
            $("#leadsTable tbody").sortable({
                axis: "y",
                containment: "parent",
                handle: "td:first-child",
                placeholder: "ui-sortable-placeholder",
                forcePlaceholderSize: true,
                tolerance: "pointer",
                cursorAt: { top: 10 },
                helper: function (e, tr) {
                    const $original = tr.children();
                    const $helper = tr.clone();
                    $helper.children().each(function (index) {
                        $(this).width($original.eq(index).width());
                    });
                    return $helper;
                },
                start: function (event, ui) {
                    const scrollInterval = setInterval(() => {
                        autoScrollDuringDrag(ui.helper);
                    }, 20);
                    ui.item.data("scrollInterval", scrollInterval);
                },
                update: function (event, ui) {
                    const updatedSlides = Array.from(
                        $("#leadsTable tbody tr")
                    ).map((row, index) => {
                        const slideId = parseInt($(row).data("id"));
                        const slide = slides.find((s) => s.id === slideId);
                        return { ...slide, subtitle: `Subtitle ${index + 1}` };
                    });
                    setSlides(updatedSlides);
                },
                stop: function (event, ui) {
                    clearInterval(ui.item.data("scrollInterval"));
                },
            });

            $("<style>")
                .prop("type", "text/css")
                .html(`
                    .ui-sortable-placeholder {
                        background: #f0f0f0;
                        border-left: 2px solid purple;
                        visibility: visible !important;
                        height: 50px;
                    }
                    td[data-tooltip]:hover::after {
                        content: attr(data-tooltip);
                        position: absolute;
                        top: -30px;
                        left: 50%;
                        transform: translateX(-50%);
                        background: #333;
                        color: white;
                        padding: 4px 8px;
                        border-radius: 4px;
                        font-size: 12px;
                        white-space: nowrap;
                        z-index: 1000;
                    }
                    .slide-last.active {
                        background-color: rgb(211, 211, 211);
                    }
                `)
                .appendTo("head");
        }
    }, [isMounted, slides]);

    const autoScrollDuringDrag = (draggedElement) => {
        const scrollThreshold = 50;
        const scrollSpeed = 50;
        const scrollContainer = window;
        const viewportHeight = window.innerHeight;
        const elementRect = draggedElement[0].getBoundingClientRect();

        if (elementRect.top < scrollThreshold) {
            scrollContainer.scrollBy({ top: -scrollSpeed, behavior: "auto" });
        } else if (elementRect.bottom > viewportHeight - scrollThreshold) {
            scrollContainer.scrollBy({ top: scrollSpeed, behavior: "auto" });
        }
    };

    const togglePfpDropdown = () => {
        setIsPfpDropdownOpen((prev) => !prev);
    };

    const handleScriptFileChange = async (event) => {
        const file = event.target.files[0];
        setScriptFile(file);
        if (file) {
            const text = await file.text();
            if (text.length <= 5000) {
                setScriptFileName(`${file.name.slice(0, 15)}`);
            } else {
                alert("The text file exceeds the 5000-character limit!");
                setScriptFileName("No file chosen");
                setScriptFile(null);
                event.target.value = "";
            }
        } else {
            setScriptFileName("No file chosen");
        }
    };

    const loadScript = async () => {
        if (scriptFile) {
            const text = await scriptFile.text();
            const lines = text.split("\n").filter((line) => line.trim() !== "");
            const maxId = slides.length > 0 ? Math.max(...slides.map(s => s.id)) : 0;
            const newSlides = lines.map((line, index) => ({
                id: maxId + index + 1,
                subtitle: `Subtitle ${maxId + index + 1}`,
                text: line.trim(),
                markedText: line.trim(),
                originalText: line.trim(),
                isEditing: false,
            }));
            setSlides(newSlides);
            setSlideCount(maxId + lines.length);
            setActiveSlideIds(new Set());
            if (tableRef.current) {
                tableRef.current.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    const handleFolderFileChange = (event) => {
        const files = event.target.files;
        setFolderFiles(files);
        const folderName = files?.[0]?.webkitRelativePath.split("/")[0];
        if (folderName) {
            setFolderFileName(folderName.slice(0, 15));
        } else {
            setFolderFileName("No folder chosen");
        }
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

    const openModal = (modalId) => {
        if (modalId === "tutorial-video") setTutorialModalOpen(true);
        else setUploadModalOpen(true);
    };

    const closeModal = () => {
        setTutorialModalOpen(false);
        setUploadModalOpen(false);
    };

    const addSlide = (e) => {
        e.preventDefault();
        const maxId = slides.length > 0 ? Math.max(...slides.map(s => s.id)) : 0;
        const newSlide = {
            id: maxId + 1,
            subtitle: `Subtitle ${maxId + 1}`,
            text: "",
            markedText: "",
            originalText: "",
            isEditing: true,
        };
        setSlides([...slides, newSlide]);
        setSlideCount(maxId + 1);
        setActiveSlideIds(prev => new Set(prev).add(newSlide.id));
    };

    const deleteSlide = (id) => {
        const updatedSlides = slides
            .filter((slide) => slide.id !== id)
            .map((slide, index) => ({
                ...slide,
                subtitle: `Subtitle ${index + 1}`,
            }));
        setSlides(updatedSlides);
        setSlideCount(updatedSlides.length > 0 ? Math.max(...updatedSlides.map(s => s.id)) : 0);
        setActiveSlideIds(prev => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
        });
    };

    const handleTextSelection = (slideId) => {
        const selection = window.getSelection();
        const selected = selection.toString().trim();
        // Check if the selection contains at least one full word (not just a single character)
        if (selected && /\b\w+\b/.test(selected) && selected.length > 1) {
            setSelectedSlideId(slideId);
            setSelectedText(selected);
            setPopupOpen(true);
        } else {
            // Optionally alert the user or silently ignore
            // alert("Please select at least one full word.");
        }
    };

    const handlePopupSubmit = (shouldHighlight) => {
        if (shouldHighlight && selectedSlideId && selectedText) {
            const updatedSlides = slides.map((slide) => {
                if (slide.id === selectedSlideId) {
                    let newMarkedText = slide.markedText || slide.text || "";
                    if (!newMarkedText.includes(`<mark class="handlePopupSubmit">${selectedText}</mark>`)) {
                        const regex = new RegExp(`(${selectedText})(?![^<]*>)`, "i");
                        newMarkedText = newMarkedText.replace(
                            regex,
                            `<mark class="handlePopupSubmit">${selectedText}</mark>`
                        );
                    }
                    return {
                        ...slide,
                        markedText: newMarkedText,
                        isEditing: false,
                    };
                }
                return slide;
            });
            setSlides(updatedSlides);
            setActiveSlideIds((prev) => {
                const newSet = new Set(prev);
                newSet.delete(selectedSlideId);
                return newSet;
            });
        }
        setPopupOpen(false);
    };

    const toggleEdit = (slideId) => {
        const updatedSlides = slides.map((slide) =>
            slide.id === slideId
                ? { ...slide, isEditing: !slide.isEditing }
                : slide
        );
        setSlides(updatedSlides);
        setActiveSlideIds((prev) => {
            const newSet = new Set(prev);
            if (updatedSlides.find((slide) => slide.id === slideId).isEditing) {
                newSet.add(slideId);
            } else {
                newSet.delete(slideId);
            }
            return newSet;
        });
    };

    const handleKeyPress = (e, slideId) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const textarea = e.target;
            const updatedSlides = slides.map((slide) =>
                slide.id === slideId
                    ? {
                        ...slide,
                        text: textarea.value,
                        markedText: textarea.value,
                        isEditing: false,
                    }
                    : slide
            );
            setSlides(updatedSlides);
            setActiveSlideIds((prev) => {
                const newSet = new Set(prev);
                newSet.delete(slideId);
                return newSet;
            });
            textarea.blur();
        }
    };

    const handleUndo = (slideId) => {
        if (confirm("Are You Sure You Want To Reset This Sentence?")) {
            const updatedSlides = slides.map((slide) =>
                slide.id === slideId
                    ? {
                        ...slide,
                        text: slide.originalText,
                        markedText: slide.originalText,
                        isEditing: false,
                    }
                    : slide
            );
            setSlides(updatedSlides);
            setActiveSlideIds((prev) => {
                const newSet = new Set(prev);
                newSet.delete(slideId);
                return newSet;
            });
        }
    };

    const handleProceed = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            window.location.href = "/background-music";
        }, 2000);
    };

    return (
        <>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>VideoCrafter.io</title>
            <link rel="stylesheet" href="https://vlsmlsaker.s3.amazonaws.com/css/style.css" />
            <link rel="stylesheet" href="https://vlsmlsaker.s3.amazonaws.com/sceneselection/style.css" />
            <link rel="stylesheet" href="/temp.css" />
            <link href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css" rel="stylesheet" />
            <Header />
            <ProgressBar />
            <div className="body-container">
                <div id="pfp" onClick={togglePfpDropdown}></div>
                <div id="pfpdropdown" className={isPfpDropdownOpen ? "present" : "not-present"}></div>

                <div className="card-container">
                    <div className="card">
                        <div className="card-header">
                            <div id="previousButton">
                                <Link href="/home">
                                    <img src="/images/back.svg" alt="Back" />
                                </Link>
                            </div>
                            <span className="card-header-span">Upload Your Script</span>
                            <h5></h5>
                        </div>
                        <div className="card-body">
                            <div className="Script-text-file-text">
                                <div className="Script-text-file-text-sub">
                                    <div className="script-text">Script Text File:</div>
                                    <div className="vh-parent">
                                        <div className="vh-child">
                                            <span className="text3">
                                                Please Make Sure Your Script Is On Txt File
                                            </span>
                                        </div>
                                        ?
                                    </div>
                                </div>
                                <a href="/dummy/template.txt/" download="" className="download-btn">
                                    Click Here To Download An Empty Template
                                </a>
                            </div>
                        </div>
                        <div className="Script-text-file-Upload">
                            <div className="script-upload-sub">
                                <img src="/images/choose-icon.svg" alt="Choose file" />
                                <span className="text2 choosefile-heading">Choose file</span>
                                <input
                                    required
                                    type="file"
                                    id="fileUpload"
                                    accept=".txt"
                                    onChange={handleScriptFileChange}
                                />
                            </div>
                            <div className="text2" id="fileName" style={{ color: "#00000080" }}>
                                {scriptFileName}
                            </div>
                        </div>
                        <div className="center-container">
                            <button id="scriptUploadButton" className="file-button" onClick={loadScript}>
                                Load Script
                            </button>
                        </div>
                    </div>

                    <div className="card" id="uploadCard" style={{ position: "relative" }}>
                        <div className="card-header">
                            <span className="card-header-span">Upload To Your Asset Folder</span>
                            <h5>
                                These Files Will be Saved In Your Asset Library Which You Can Manage Through The Profile Icon Above
                            </h5>
                        </div>
                        <div className="card-body upload">
                            <div className="Script-text-file-text">
                                <div className="upload-folder-heading">
                                    <div className="Script-text-file-text-sub">
                                        <div className="script-text">Upload Folder:</div>
                                        <div className="vh-parent">
                                            <div className="vh-child">
                                                <span className="text3">
                                                    Please Make Sure Your Script Is On Txt File
                                                </span>
                                            </div>
                                            ?
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="Script-text-file-Upload">
                            <div className="script-upload-sub">
                                <img src="/images/choose-icon.svg" alt="Choose file" />
                                <span className="text2 choosefile-heading">Choose file</span>
                                <input
                                    id="fileInput"
                                    type="file"
                                    webkitdirectory="true"
                                    multiple
                                    onChange={handleFolderFileChange}
                                />
                            </div>
                            <div className="text2" id="fileName2" style={{ color: "#00000080" }}>
                                {folderFileName}
                            </div>
                        </div>
                        <div id="centered-c" className="center-containered">
                            <div id="uploadStatus" style={{ textAlign: "center" }}></div>
                            <div id="progressWrapper" style={{ display: "none" }}>
                                <div id="progressBar"></div>
                                <div id="percent"></div>
                            </div>
                            <button className="file-button" id="videoUploadButton">
                                Upload and Process
                            </button>
                        </div>
                    </div>
                </div>

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

                <div className="lead-container lead-details" style={{ maxWidth: "96%", margin: "0 auto" }}>
                    <table id="leadsTable" className="lead-table" style={{ width: "100%", display: "table" }} ref={tableRef}>
                        <thead>
                            <tr style={{ height: "fit-content" }}>
                                <th className="slide-first" style={{ fontSize: "1.4rem" }}>Subtitle</th>
                                <th style={{ fontSize: "1.4rem" }}>Subtitle Text</th>
                                <th className="slide-last">Edit</th>
                                <th className="slide-last">Undo</th>
                                <th className="slide-last">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {slides.map((slide) => (
                                <tr key={slide.id} data-id={slide.id} style={{ height: "5rem" }}>
                                    <td
                                        className="slide-first"
                                        style={{ fontSize: "1.4rem", position: "relative", cursor: "grab" }}
                                        title="Drag to move"
                                    >
                                        {slide.subtitle}
                                    </td>
                                    <td id={`highlightable_${slide.id}`} onMouseUp={() => handleTextSelection(slide.id)}>
                                        <div className="highlight-sub">
                                            {slide.isEditing ? (
                                                <textarea
                                                    className="textarea-class"
                                                    id={`slide_text_${slide.id}`}
                                                    name="slide_text"
                                                    placeholder="Type Your Script Here"
                                                    value={slide.text}
                                                    onChange={(e) => {
                                                        const updatedSlides = slides.map((s) =>
                                                            s.id === slide.id
                                                                ? { ...s, text: e.target.value, markedText: e.target.value }
                                                                : s
                                                        );
                                                        setSlides(updatedSlides);
                                                    }}
                                                    onMouseUp={() => handleTextSelection(slide.id)}
                                                    onKeyDown={(e) => handleKeyPress(e, slide.id)}
                                                />
                                            ) : (
                                                <span dangerouslySetInnerHTML={{ __html: slide.markedText || slide.text || "" }} />
                                            )}
                                            <div className="error-message" style={{ display: "none" }}>
                                                Assign Clips To All Of The Subtitle Text
                                            </div>
                                            <div className="error-message" style={{ display: "none" }}>
                                                Highlighting Must Start From The First Unassigned Word Of The Sentence.
                                            </div>
                                        </div>
                                    </td>
                                    <td className={`slide-last ${activeSlideIds.has(slide.id) ? "active" : ""}`}>
                                        <a href="#" className="above-del" onClick={(e) => { e.preventDefault(); toggleEdit(slide.id); }}>
                                            <i
                                                id="icon"
                                                className="ri-edit-box-line fa-sync-alt icon"
                                                style={{ margin: "0 auto", fontSize: "20px", fontWeight: 600, cursor: "pointer", verticalAlign: "middle" }}
                                            ></i>
                                        </a>
                                    </td>
                                    <td className={`slide-last ${activeSlideIds.has(slide.id) ? "active" : ""}`}>
                                        <a href="#" onClick={(e) => { e.preventDefault(); handleUndo(slide.id); }} className="above-del">
                                            <img src="/images/undo.svg" alt="Undo" style={{ width: "1.2rem", height: "3rem", cursor: "pointer" }} />
                                        </a>
                                    </td>
                                    <td className="slide-last" id={`action_${slide.id}`}>
                                        <a href="#" className="delete-row-btn" onClick={(e) => { e.preventDefault(); deleteSlide(slide.id); }}>
                                            <img
                                                src="/images/delete-icn.svg"
                                                alt="delete"
                                                style={{ width: "1.5rem", height: "3rem", cursor: "pointer" }}
                                            />
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="add-new-sub">
                        <div className="d-flex justify-content-start">
                            <a href="#" id="createLeadBtn" className="btn proceed-btn" onClick={addSlide}>
                                Add New Subtitle +
                            </a>
                        </div>
                    </div>

                    <input type="number" name="no_of_slides" id="no_of_slides" hidden value={slideCount} readOnly />

                    <div className="button-container">
                        <button
                            type="button"
                            className={`button-container-btn ${isProcessing ? "processing" : ""}`}
                            onClick={handleProceed}
                            disabled={isProcessing}
                        >
                            <span id="button-text">
                                {isProcessing ? `Processing${".".repeat(dotCount)}` : "Proceed To Background Music Selection"}
                            </span>
                            {!isProcessing && <img src="/images/arrow.svg" alt="Arrow" />}
                        </button>
                    </div>
                </div>

                {popupOpen && (
                    <PopupModal
                        selectedText={selectedText}
                        onClose={() => setPopupOpen(false)}
                        onSubmit={handlePopupSubmit}
                    />
                )}

                {isMounted && (
                    <>
                        <Script src="https://code.jquery.com/jquery-3.6.0.min.js" strategy="afterInteractive" />
                        <Script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" strategy="afterInteractive" />
                        <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" strategy="afterInteractive" />
                        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" strategy="afterInteractive" />
                    </>
                )}
            </div>
        </>
    );
}