"use client";
import { useEffect, useRef } from "react";
import PopupModal from "@/components/PopupModal/PopupModal";

const TableComponent = ({
    slides,
    setSlides,
    slideCount,
    setSlideCount,
    activeSlideIds,
    setActiveSlideIds,
    isProcessing,
    setIsProcessing,
    dotCount,
    popupOpen,
    setPopupOpen,
    selectedSlideId,
    setSelectedSlideId,
    selectedText,
    setSelectedText,
    handleProceed,
}) => {
    const tableRef = useRef(null);

    useEffect(() => {
        if (tableRef.current) {
            tableRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [slides]);

    const addSlide = (e) => {
        e.preventDefault();
        const newId = slides.length + 1;
        const newSlide = {
            id: newId,
            subtitle: `Subtitle ${newId}`,
            text: "",
            markedText: "",
            originalText: "",
            isEditing: true,
        };
        setSlides([...slides, newSlide]);
        setSlideCount(newId);
        setActiveSlideIds((prev) => new Set(prev).add(newSlide.id));
    };

    const deleteSlide = (id) => {
        const updatedSlides = slides
            .filter((slide) => slide.id !== id)
            .map((slide, index) => ({
                ...slide,
                subtitle: `Subtitle ${index + 1}`,
            }));
        setSlides(updatedSlides);
        setSlideCount(updatedSlides.length > 0 ? Math.max(...updatedSlides.map((s) => s.id)) : 0);
        setActiveSlideIds((prev) => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
        });
    };

    // Check if all textareas are hidden (i.e., no slides are in editing mode)
    const areAllTextareasHidden = () => {
        return slides.every((slide) => !slide.isEditing);
    };

    // Check for slides that have unassigned text (i.e., text not wrapped in <mark> tags)
    const fetchNoSubclipIds = async () => {
        const idsWithoutClips = slides
            .filter((slide) => {
                const markedText = slide.markedText || slide.text || "";
                // Strip out all <mark> tags and their content to get the remaining unassigned text
                const unassignedText = markedText
                    .replace(/<mark class="handlePopupSubmit">[^<]+<\/mark>/g, "")
                    .trim();
                // If there's any remaining text after stripping <mark> tags, the slide has unassigned text
                return unassignedText.length > 0;
            })
            .map((slide) => slide.id);
        return idsWithoutClips;
    };

    // Update backend order (mocked for now)
    const updateBackendOrder = () => {
        console.log("Updating backend order with slides:", slides);
        // Add your backend update logic here if needed
    };

    // Handle Proceed button click with validations
    const handleProceedWithValidation = async () => {
        setIsProcessing(true);

        if (areAllTextareasHidden()) {
            const idsWithoutClips = await fetchNoSubclipIds();
            if (idsWithoutClips.length > 0) {
                // Show error messages for slides with unassigned text
                idsWithoutClips.forEach((id) => {
                    const errorMessage = document.querySelector(`#error-message_${id}`);
                    if (errorMessage) {
                        const slide = slides.find((s) => s.id === id);
                        if (!slide.markedText || slide.markedText.trim() === "") {
                            errorMessage.textContent = "Please Wait For Clip To Process";
                        } else {
                            errorMessage.textContent = "Assign Clips To All Of The Subtitle Text";
                        }
                        errorMessage.style.display = "block"; // Show the error message
                    }
                });
                setIsProcessing(false);
            } else {
                // No validation errors, proceed
                updateBackendOrder();
                handleProceed(); // Call the original handleProceed to navigate
            }
        } else {
            alert("You Need To Save or Delete The Current Text");
            setIsProcessing(false);
        }
    };

    // Handle text selection with validation
    const handleTextSelection = (slideId) => {
        const slide = slides.find((s) => s.id === slideId);
        if (slide.isEditing) return; // Don't show popup if in editing mode

        const selection = window.getSelection();
        const selected = selection.toString().trim();
        if (selected && /\b\w+\b/.test(selected) && selected.length > 1) {
            // Get the current marked text and strip out already assigned (marked) portions
            const markedText = slide.markedText || slide.text || "";
            const unassignedText = markedText
                .replace(/<mark class="handlePopupSubmit">[^<]+<\/mark>/g, "")
                .trim(); // Remove marked text to get only unassigned text

            // Validate the selection against the unassigned text
            const startsCorrectly = unassignedText.startsWith(selected);
            const words = unassignedText.split(/\s+/);
            const selectedWords = selected.split(/\s+/);
            const isWordAligned = selectedWords.every((word) => words.includes(word));

            const errorMessage = document.querySelector(`#error-message_${slideId}`);
            if (startsCorrectly && isWordAligned) {
                if (errorMessage) {
                    errorMessage.textContent = "";
                    errorMessage.style.display = "none";
                }
                setSelectedSlideId(slideId);
                setSelectedText(selected);
                setPopupOpen(true);
            } else {
                if (errorMessage) {
                    errorMessage.textContent = "Highlighting Must Start From The First Unassigned Word Of The Sentence.";
                    errorMessage.style.display = "block";
                }
            }
            selection.removeAllRanges();
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
            slide.id === slideId ? { ...slide, isEditing: !slide.isEditing } : slide
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
            const updatedSlides = slides.map((slide) => {
                if (slide.id === slideId) {
                    if (!slide.originalText || slide.originalText.trim() === "") {
                        const cleanedText = slide.markedText.replace(
                            /<mark class="handlePopupSubmit">([^<]+)<\/mark>/gi,
                            "$1"
                        );
                        return {
                            ...slide,
                            text: cleanedText,
                            markedText: cleanedText,
                            isEditing: false,
                        };
                    }
                    return {
                        ...slide,
                        text: slide.originalText,
                        markedText: slide.originalText,
                        isEditing: false,
                    };
                }
                return slide;
            });
            setSlides(updatedSlides);
            setActiveSlideIds((prev) => {
                const newSet = new Set(prev);
                newSet.delete(slideId);
                return newSet;
            });
        }
    };

    return (
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
                                                    s.id === slide.id ? { ...s, text: e.target.value, markedText: e.target.value } : s
                                                );
                                                setSlides(updatedSlides);
                                            }}
                                            onKeyDown={(e) => handleKeyPress(e, slide.id)}
                                        />
                                    ) : (
                                        <span
                                            dangerouslySetInnerHTML={{ __html: slide.markedText || slide.text || "" }}
                                            onMouseUp={() => handleTextSelection(slide.id)}
                                        />
                                    )}
                                    <div id={`error-message_${slide.id}`} className="error-message" style={{ display: "none" }}>
                                        {/* Error message will be set dynamically */}
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
                    onClick={handleProceedWithValidation}
                    disabled={isProcessing}
                >
                    <span id="button-text">
                        {isProcessing ? `Processing${".".repeat(dotCount)}` : "Proceed To Background Music Selection"}
                    </span>
                    <img
                        id="proceed-svg"
                        src="/images/arrow.svg"
                        alt="Arrow"
                        style={{ display: isProcessing ? "none" : "inline-block" }}
                    />
                </button>
            </div>

            {popupOpen && (
                <PopupModal
                    selectedText={selectedText}
                    onClose={() => setPopupOpen(false)}
                    onSubmit={handlePopupSubmit}
                />
            )}
        </div>
    );
};

export default TableComponent;