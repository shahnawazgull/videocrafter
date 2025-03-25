"use client"
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
            subtitle: `Subtitle ${newId}`, // Will start from 1 if empty, or continue sequence
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

    const handleTextSelection = (slideId) => {
        const slide = slides.find(s => s.id === slideId);
        if (slide.isEditing) return;  // Don't show popup if in editing mode

        const selection = window.getSelection();
        const selected = selection.toString().trim();
        if (selected && /\b\w+\b/.test(selected) && selected.length > 1) {
            setSelectedSlideId(slideId);
            setSelectedText(selected);
            setPopupOpen(true);
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