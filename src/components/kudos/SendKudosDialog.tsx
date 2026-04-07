"use client";

import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { RichTextEditor } from "./RichTextEditor";
import { HashtagSelector } from "./HashtagSelector";
import { ImageUploader } from "./ImageUploader";
import { createKudos } from "@/services/kudos";
import { SearchIcon } from "@/components/icons/SearchIcon";

type UploadedImage = {
  id: string;
  previewUrl: string;
  uploadUrl?: string;
  status: "pending" | "uploading" | "uploaded" | "error";
};

type FormState = {
  recipientId: string;
  recipientName: string;
  badgeTitle: string;
  messageHtml: string;
  hashtags: string[];
  images: UploadedImage[];
  isAnonymous: boolean;
  isSubmitting: boolean;
  errors: Record<string, string>;
  isDirty: boolean;
};

type FormAction =
  | { type: "SET_RECIPIENT"; id: string; name: string }
  | { type: "SET_BADGE"; value: string }
  | { type: "SET_MESSAGE"; html: string }
  | { type: "SET_HASHTAGS"; tags: string[] }
  | { type: "SET_IMAGES"; images: UploadedImage[] }
  | { type: "SET_ANONYMOUS"; value: boolean }
  | { type: "SET_SUBMITTING"; value: boolean }
  | { type: "SET_ERRORS"; errors: Record<string, string> }
  | { type: "RESET" };

const initialState: FormState = {
  recipientId: "",
  recipientName: "",
  badgeTitle: "",
  messageHtml: "",
  hashtags: [],
  images: [],
  isAnonymous: false,
  isSubmitting: false,
  errors: {},
  isDirty: false,
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_RECIPIENT":
      return { ...state, recipientId: action.id, recipientName: action.name, isDirty: true, errors: { ...state.errors, recipient: "" } };
    case "SET_BADGE":
      return { ...state, badgeTitle: action.value, isDirty: true };
    case "SET_MESSAGE":
      return { ...state, messageHtml: action.html, isDirty: true, errors: { ...state.errors, message: "" } };
    case "SET_HASHTAGS":
      return { ...state, hashtags: action.tags, isDirty: true, errors: { ...state.errors, hashtags: "" } };
    case "SET_IMAGES":
      return { ...state, images: action.images, isDirty: true };
    case "SET_ANONYMOUS":
      return { ...state, isAnonymous: action.value, isDirty: true };
    case "SET_SUBMITTING":
      return { ...state, isSubmitting: action.value };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export function SendKudosDialog({
  isOpen,
  onClose,
  onSuccess,
  currentUserId,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  currentUserId: string;
}) {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [recipientQuery, setRecipientQuery] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (state.isDirty) {
      const confirmed = window.confirm(
        "Bạn có chắc muốn hủy? Nội dung chưa được lưu sẽ bị mất."
      );
      if (!confirmed) return;
    }
    dispatch({ type: "RESET" });
    setRecipientQuery("");
    onClose();
  }, [state.isDirty, onClose]);

  function validate(): Record<string, string> {
    const errors: Record<string, string> = {};
    if (!state.recipientId) errors.recipient = "Vui lòng chọn người nhận";
    if (state.recipientId === currentUserId) errors.recipient = "Bạn không thể gửi kudos cho chính mình";
    const textContent = state.messageHtml.replace(/<[^>]*>/g, "").trim();
    if (!textContent) errors.message = "Vui lòng nhập lời cảm ơn";
    if (state.hashtags.length === 0) errors.hashtags = "Vui lòng chọn ít nhất 1 hashtag";
    return errors;
  }

  async function handleSubmit() {
    const errors = validate();
    if (Object.values(errors).some(Boolean)) {
      dispatch({ type: "SET_ERRORS", errors });
      return;
    }

    dispatch({ type: "SET_SUBMITTING", value: true });
    try {
      await createKudos({
        receiverId: state.recipientId,
        message: state.messageHtml,
        category: state.badgeTitle || undefined,
        hashtags: state.hashtags,
        imageUrls: state.images.map((i) => i.uploadUrl || i.previewUrl),
      });
      dispatch({ type: "RESET" });
      setRecipientQuery("");
      onClose();
      onSuccess?.();
    } catch {
      dispatch({
        type: "SET_ERRORS",
        errors: { submit: "Gửi thất bại. Vui lòng thử lại." },
      });
    } finally {
      dispatch({ type: "SET_SUBMITTING", value: false });
    }
  }

  if (!isOpen || !mounted) return null;

  const dialog = (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[rgba(0,16,26,0.8)]"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="send-kudos-title"
        className="relative w-[752px] max-w-[95vw] max-h-[90vh] bg-[#FFF8E1] rounded-3xl p-10 flex flex-col gap-8 overflow-y-auto z-50 animate-in fade-in slide-in-from-bottom-4 duration-200"
      >
        {/* Title */}
        <h2
          id="send-kudos-title"
          className="font-[family-name:var(--font-montserrat)] text-[32px] font-bold text-[#00101A] text-center leading-10"
        >
          Gửi lời cám ơn và ghi nhận đến đồng đội
        </h2>

        {/* Recipient */}
        <div className="flex items-center gap-4">
          <label className="shrink-0 font-[family-name:var(--font-montserrat)] text-[22px] font-bold text-[#00101A]">
            Người nhận<span className="text-[#CF1322] ml-0.5">*</span>
          </label>
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={state.recipientName || recipientQuery}
                onChange={(e) => {
                  setRecipientQuery(e.target.value);
                  if (state.recipientId) dispatch({ type: "SET_RECIPIENT", id: "", name: "" });
                }}
                placeholder="Tìm kiếm"
                className="w-full h-14 border border-[#998C5F] rounded-lg px-6 py-4 bg-white font-[family-name:var(--font-montserrat)] text-base font-bold text-[#00101A] placeholder:text-[#999] focus:outline-2 focus:outline-[#FFEA9E]"
              />
              <SearchIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#999]" />
            </div>
            {state.errors.recipient && (
              <p className="mt-1 text-sm text-[#CF1322] font-[family-name:var(--font-montserrat)]">
                {state.errors.recipient}
              </p>
            )}
          </div>
        </div>

        {/* Badge/Title */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <label className="shrink-0 font-[family-name:var(--font-montserrat)] text-[22px] font-bold text-[#00101A]">
              Danh hiệu<span className="text-[#CF1322] ml-0.5">*</span>
            </label>
            <input
              type="text"
              value={state.badgeTitle}
              onChange={(e) => dispatch({ type: "SET_BADGE", value: e.target.value })}
              placeholder="Dành tặng một danh hiệu cho đồng đội"
              className="flex-1 h-14 border border-[#998C5F] rounded-lg px-6 py-4 bg-white font-[family-name:var(--font-montserrat)] text-base font-bold text-[#00101A] placeholder:text-[#999] focus:outline-2 focus:outline-[#FFEA9E]"
            />
          </div>
          <p className="ml-[155px] font-[family-name:var(--font-montserrat)] text-base font-bold text-[#999] tracking-[0.15px]">
            Ví dụ: Người truyền động lực cho tôi.
            <br />
            Danh hiệu sẽ hiển thị làm tiêu đề Kudos của bạn.
          </p>
        </div>

        {/* Rich Text Editor */}
        <div>
          <RichTextEditor
            content={state.messageHtml}
            onChange={(html) => dispatch({ type: "SET_MESSAGE", html })}
          />
          {state.errors.message && (
            <p className="mt-1 text-sm text-[#CF1322] font-[family-name:var(--font-montserrat)]">
              {state.errors.message}
            </p>
          )}
        </div>

        {/* Hashtags */}
        <div className="flex items-start gap-4">
          <label className="shrink-0 pt-2 font-[family-name:var(--font-montserrat)] text-[22px] font-bold text-[#00101A]">
            Hashtag<span className="text-[#CF1322] ml-0.5">*</span>
          </label>
          <div className="flex-1">
            <HashtagSelector
              hashtags={state.hashtags}
              onChange={(tags) => dispatch({ type: "SET_HASHTAGS", tags })}
            />
            {state.errors.hashtags && (
              <p className="mt-1 text-sm text-[#CF1322] font-[family-name:var(--font-montserrat)]">
                {state.errors.hashtags}
              </p>
            )}
          </div>
        </div>

        {/* Images */}
        <div className="flex items-start gap-4">
          <label className="shrink-0 pt-2 font-[family-name:var(--font-montserrat)] text-[22px] font-bold text-[#00101A]">
            Image
          </label>
          <ImageUploader
            images={state.images}
            onChange={(imgs) => dispatch({ type: "SET_IMAGES", images: imgs })}
          />
        </div>

        {/* Anonymous Checkbox */}
        <label className="flex items-center gap-4 cursor-pointer">
          <input
            type="checkbox"
            checked={state.isAnonymous}
            onChange={(e) => dispatch({ type: "SET_ANONYMOUS", value: e.target.checked })}
            className="w-6 h-6 border border-[#999] rounded accent-[#FFEA9E]"
          />
          <span className="font-[family-name:var(--font-montserrat)] text-[22px] font-bold text-[#999]">
            Gửi lời cám ơn và ghi nhận ẩn danh
          </span>
        </label>

        {/* Submit error */}
        {state.errors.submit && (
          <p className="text-sm text-[#CF1322] font-[family-name:var(--font-montserrat)] text-center">
            {state.errors.submit}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex gap-6">
          <button
            type="button"
            onClick={handleClose}
            className="border border-[#998C5F] bg-[rgba(255,234,158,0.1)] rounded px-10 py-4 flex items-center gap-2 font-[family-name:var(--font-montserrat)] text-base font-bold text-[#00101A] cursor-pointer hover:bg-[rgba(255,234,158,0.2)] transition-colors"
          >
            Hủy <span>×</span>
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={state.isSubmitting}
            className="flex-1 h-[60px] bg-[#FFEA9E] rounded-lg flex items-center justify-center gap-2 font-[family-name:var(--font-montserrat)] text-[22px] font-bold text-[#00101A] cursor-pointer hover:bg-[#FFE082] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {state.isSubmitting ? "Đang gửi..." : "Gửi"} ▷
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(dialog, document.body);
}
