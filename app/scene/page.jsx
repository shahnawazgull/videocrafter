"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "/styles/style.css";
import "/styles/scene-style.css";
import "/styles/scene.css";
import "/styles/main-scenes.css";
import "/styles/add-scene-style.css";
import Header from "@/components/Home/Header";
import ProgressBar from "@/components/Home/ProgressBar";
import Link from "next/link";
import Instruction from "@/components/Instruction/Instruction";
import TableComponent from "@/components/TableComponent/TableComponent";
import Script from "next/script";

export default function Home() {
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
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
        const initialActiveIds = new Set(
            slides.filter((slide) => slide.isEditing).map((slide) => slide.id)
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
                    const updatedSlides = Array.from($("#leadsTable tbody tr")).map((row, index) => {
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
            const maxId = slides.length > 0 ? Math.max(...slides.map((s) => s.id)) : 0;
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
                <Instruction />

                <TableComponent
                    slides={slides}
                    setSlides={setSlides}
                    slideCount={slideCount}
                    setSlideCount={setSlideCount}
                    activeSlideIds={activeSlideIds}
                    setActiveSlideIds={setActiveSlideIds}
                    isProcessing={isProcessing}
                    setIsProcessing={setIsProcessing}
                    dotCount={dotCount}
                    popupOpen={popupOpen}
                    setPopupOpen={setPopupOpen}
                    selectedSlideId={selectedSlideId}
                    setSelectedSlideId={setSelectedSlideId}
                    selectedText={selectedText}
                    setSelectedText={setSelectedText}
                    handleProceed={handleProceed}
                />

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