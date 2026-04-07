# Feature Specification: Viet Kudo (Write Kudo Dialog)

**Frame ID**: `ihQ26W78P2`
**Frame Name**: `Viet Kudo`
**File Key**: `9ypp4enmFmdK3YAFJLIu6C`
**Created**: 2026-04-07
**Status**: Draft

---

## Overview

The "Viet Kudo" (Write Kudo) dialog is a modal overlay component triggered from the Sun* Kudos Live Board page (`/sun-kudos`) when the user clicks the send-kudos input bar. It does NOT have its own URL route -- it renders as a centered overlay on top of the existing page with a dark scrim backdrop.

The modal presents a structured form for composing and sending a kudos message to a colleague. The form includes: a recipient search field with autocomplete, a badge/title selector, a rich text editor with formatting toolbar (bold, italic, strikethrough, numbered list, link, quote) and @ mention support, a hashtag selector (1-5 tag chips), an optional image upload area (up to 5 images), an anonymous sending checkbox, and Cancel/Send action buttons. The modal uses a warm cream background (#FFF8E1) with gold accent styling consistent with the Sun* Kudos design language.

The dialog requires authentication context (the user must already be logged in to the Sun* Kudos page). On successful submission, the modal closes and the new kudos post appears at the top of the Live Board feed.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Form Submission Flow (Priority: P1)

As an authenticated user on the Sun* Kudos Live Board, I want to open the Write Kudo dialog, fill in a recipient, message, and hashtags, then submit the form so that my kudos post is published to the live feed.

**Why this priority**: This is the core write path for the entire Kudos feature. Without it, no new kudos can be created. It exercises the full lifecycle: open modal, fill fields, validate, submit, close, and reflect the new post.

**Independent Test**: Click the send-kudos input bar on `/sun-kudos`. Verify the modal opens. Fill in recipient (search and select), type a message, add at least one hashtag. Click "Gui" (Send). Verify the modal closes and a new kudos card appears at the top of the ALL KUDOS feed.

**Acceptance Scenarios**:

1. **Given** the user is on `/sun-kudos`, **When** they click the send-kudos input bar, **Then** the Write Kudo modal opens with a dark overlay (rgba(0,16,26,0.8)) and a centered 752px-wide cream form panel with all fields in their default/empty state.
2. **Given** the modal is open, **When** the user types in the "Nguoi nhan" (Recipient) field, **Then** an autocomplete dropdown appears showing matching users with name, avatar, and department after a debounced search (300ms).
3. **Given** the user has selected a recipient from the dropdown, **When** the selection is made, **Then** the recipient field displays the selected user as a chip/tag with their name and the dropdown closes.
4. **Given** the user has filled in all required fields (recipient, badge/title, message text, and at least 1 hashtag), **When** they click the "Gui" (Send) button, **Then** the button enters a loading/disabled state, the form submits via POST /api/kudos, the modal closes on success, and the new kudos post appears at the top of the Live Board feed.
5. **Given** the form is submitting, **When** the server returns a success response, **Then** a success toast notification is shown (e.g., "Gui kudos thanh cong!") and the feed refreshes to include the new post.
6. **Given** the form is submitting, **When** the server returns a validation error, **Then** inline error messages appear next to the offending fields and the modal remains open.
7. **Given** the user clicks "Huy" (Cancel) or clicks the overlay backdrop, **When** no form data has been entered, **Then** the modal closes immediately without any confirmation prompt.
8. **Given** the user has entered data into any form field, **When** they attempt to close the modal (Cancel button, backdrop click, or Escape key), **Then** a confirmation prompt asks "Ban co chac muon huy? Noi dung chua duoc luu se bi mat." with options to discard or continue editing.

---

### User Story 2 - Rich Text Editing and @ Mentions (Priority: P1)

As a user composing a kudos message, I want to format my text with bold, italic, strikethrough, numbered lists, links, and quotes, and I want to @ mention other users inline so that my message is expressive and can tag relevant people.

**Why this priority**: The rich text editor is the primary content area of the kudos form. Without formatting and mention support, the message would be plain text only, significantly reducing the expressiveness and engagement value of kudos posts.

**Independent Test**: Open the Write Kudo modal. Click each toolbar button (Bold, Italic, Strikethrough, Numbered list, Link, Quote) and verify the corresponding formatting is applied to selected text or toggled for new input. Type "@" followed by a name and verify the mention autocomplete appears and a selected mention is inserted as a styled chip.

**Acceptance Scenarios**:

1. **Given** the modal is open, **When** the user views the message editor area, **Then** a toolbar is displayed above the textarea with 6 formatting buttons (Bold, Italic, Strikethrough, Numbered list, Link, Quote) and a "Tieu chuan cong dong" (Community standards) link in red (#E46060).
2. **Given** the user selects text in the editor, **When** they click the Bold toolbar button, **Then** the selected text is wrapped in bold formatting and the Bold button appears in an active/toggled state.
3. **Given** the user is typing in the editor, **When** they type "@" followed by at least 1 character, **Then** a mention autocomplete dropdown appears below the cursor with matching user profiles (name, avatar, department).
4. **Given** the mention dropdown is visible, **When** the user selects a user from the dropdown, **Then** the @ mention is inserted as a styled inline chip/tag in the editor and the dropdown closes.
5. **Given** the user clicks the Link toolbar button, **When** no text is selected, **Then** a small popover or inline prompt appears asking for the URL and display text.
6. **Given** the user clicks the "Tieu chuan cong dong" link, **When** the link is clicked, **Then** the community standards page/modal opens (external link or internal overlay).

---

### User Story 3 - Image Upload (Priority: P2)

As a user composing a kudos message, I want to attach up to 5 images to my kudos so that I can include visual context or photos with my appreciation message.

**Why this priority**: Image attachment enhances the richness of kudos posts but is optional. The core kudos flow (text + recipient + hashtags) works without images. This can be implemented after the text-based flow is complete.

**Independent Test**: Open the Write Kudo modal. Click the "+ Image" button. Select an image file. Verify the thumbnail appears in the image area with a red remove button. Add up to 5 images and verify the "+ Image" button is hidden after 5. Remove an image and verify the button reappears.

**Acceptance Scenarios**:

1. **Given** the modal is open, **When** the user views the image section, **Then** a "+ Image" button (border #998C5F, bg white, radius 8px) is displayed.
2. **Given** the user clicks the "+ Image" button, **When** the file picker opens, **Then** the user can select image files (jpg, png, gif, webp) with a maximum file size of 5MB per image.
3. **Given** the user selects a valid image, **When** the upload completes, **Then** a thumbnail preview (with gold #FFEA9E border) appears in the image area and a red remove button (#D4271D, 20px circle) is overlaid on the top-right corner of the thumbnail.
4. **Given** 5 images are already attached, **When** the user views the image section, **Then** the "+ Image" button is hidden or disabled.
5. **Given** the user clicks the red remove button on a thumbnail, **When** the button is clicked, **Then** the image is removed from the attachment list and the "+ Image" button reappears if count drops below 5.
6. **Given** the user selects a file larger than 5MB, **When** the validation runs, **Then** an error message is shown (e.g., "Kich thuoc anh toi da la 5MB") and the file is not attached.
7. **Given** the user selects a non-image file, **When** the validation runs, **Then** an error message is shown (e.g., "Chi chap nhan file anh (jpg, png, gif, webp)") and the file is not attached.

---

### Edge Cases

- **Empty required fields**: If the user clicks "Gui" without filling recipient, message, or hashtags, inline validation errors appear immediately on all empty required fields. The form does not submit.
- **Self-kudos prevention**: If the user selects themselves as the recipient, the system displays an inline error "Ban khong the gui kudos cho chinh minh" and prevents submission.
- **Network failure during submission**: If the POST /api/kudos request fails due to network error, the modal remains open, the Send button returns to its enabled state, and a toast error is shown: "Gui that bai. Vui long thu lai."
- **Network failure during image upload**: If the image upload request fails, the thumbnail is removed, an error toast is shown, and the user can retry.
- **Unsaved changes on page navigation**: If the user attempts to navigate away from `/sun-kudos` while the modal is open with data, the browser's beforeunload event fires a confirmation dialog.
- **Duplicate submission prevention**: The Send button is disabled immediately on click and remains disabled until the request completes or fails, preventing double-submission.
- **Recipient search returns no results**: The autocomplete dropdown shows "Khong tim thay nguoi dung nao" when the search query matches no users.
- **Maximum hashtag limit**: When 5 hashtags are selected, the "+ Hashtag" button is hidden or disabled. Attempting to add more shows no additional action.
- **Session expiry during editing**: If the user's auth session expires while the modal is open, the next API call (submit or image upload) returns 401 and the user is redirected to the Login screen.
- **Concurrent editing**: If another user sends a kudos while the modal is open, the feed updates in the background; the modal is not affected.

---

## UI/UX Requirements *(from Figma)*

### Screen Components

| ID | Component | Description | Interactions |
|----|-----------|-------------|--------------|
| A | Modal Title | "Gui loi cam on va ghi nhan den dong doi" -- centered heading in 32px Montserrat bold #00101A | Static display |
| B | Nguoi nhan (Recipient) | Required search input with autocomplete dropdown; displays selected user as chip | Type to search (debounced 300ms), click to select, click chip X to deselect |
| C | Danh hieu (Badge/Title) | Required text input "Danh tang mot danh hieu cho dong doi" with helper text | Click to open badge selector or type badge name |
| D | Rich Text Toolbar | Row of 6 formatting buttons: Bold, Italic, Strikethrough, Numbered list, Link, Quote; plus "Tieu chuan cong dong" link (#E46060) | Click to toggle formatting on selected text or at cursor |
| E | Message Textarea | Required rich text editor area, placeholder "Hay gui gam loi cam on...", supports @ mentions | Type text, use toolbar for formatting, type @ for mention autocomplete |
| F | Hashtag | Required (min 1, max 5), tag chips with "+ Hashtag" button | Click "+ Hashtag" to add from list/input, click X on chip to remove |
| G | Image | Optional (max 5), thumbnail previews with red X remove buttons, "+ Image" button | Click "+ Image" to open file picker, click red X to remove thumbnail |
| H | Gui an danh (Anonymous) | Checkbox (24x24px) with label "Gui an danh" | Check/uncheck to toggle anonymous sending |
| I | Cancel Button | "Huy" -- outlined button with gold/10% bg, border #998C5F | Click to close modal (with unsaved changes confirmation if data entered) |
| J | Send Button | "Gui" -- primary gold button #FFEA9E, 502x60px | Click to validate and submit form; enters loading state during submission |

### Navigation Flow

- **From**: Sun* Kudos Live Board (`/sun-kudos`) -- clicking the send-kudos input bar
- **To**: Same page (`/sun-kudos`) -- modal closes after successful submission or cancellation
- **Triggers**: Click send-kudos input bar (open), click Cancel/backdrop/Escape (close), click Send (submit + close)
- **URL**: No URL change -- the modal is an overlay component, not a routed page

### Visual Requirements

- Responsive breakpoints: Desktop (1024px+) uses fixed 752px modal width; Tablet (768-1023px) modal scales to ~90vw with max-width 752px; Mobile (<768px) modal becomes full-screen or near-full-screen with adjusted padding
- Animations/Transitions: Modal opens with 200ms fade-in + slide-up, closes with reverse animation
- Accessibility: Focus trap within modal when open, Escape key closes modal, aria-modal="true", aria-labelledby on title, tab order follows visual order top-to-bottom

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST render the Write Kudo modal as an overlay on the Sun* Kudos Live Board when the send-kudos input bar is clicked.
- **FR-002**: System MUST display a dark overlay (rgba(0,16,26,0.8)) behind the modal that covers the full viewport.
- **FR-003**: System MUST provide a recipient search input that queries the user directory with debounced autocomplete (300ms delay, minimum 1 character).
- **FR-004**: System MUST display autocomplete results with user avatar, full name, and department code.
- **FR-005**: System MUST prevent the user from selecting themselves as a recipient (self-kudos prevention).
- **FR-006**: System MUST provide a badge/title selector field that is required for submission.
- **FR-007**: System MUST render a rich text toolbar with Bold, Italic, Strikethrough, Numbered list, Link, and Quote formatting options.
- **FR-008**: System MUST support @ mention autocomplete within the rich text editor, triggered by typing "@" followed by at least 1 character.
- **FR-009**: System MUST require a message body with minimum 1 character of non-whitespace content.
- **FR-010**: System MUST support hashtag selection with minimum 1 and maximum 5 hashtags displayed as removable tag chips.
- **FR-011**: System MUST support optional image attachment with a maximum of 5 images, each no larger than 5MB, in formats jpg/png/gif/webp.
- **FR-012**: System MUST display image thumbnails with gold borders and a red circular remove button (20px, #D4271D) on each thumbnail.
- **FR-013**: System MUST provide a "Gui an danh" (Send anonymously) checkbox that, when checked, omits the sender identity from the published kudos post.
- **FR-014**: System MUST validate all required fields (recipient, badge, message, hashtags) before submission and display inline error messages for invalid fields.
- **FR-015**: System MUST prompt for confirmation when the user attempts to close the modal with unsaved form data (any field modified from default).

### Technical Requirements

- **TR-001**: Modal component MUST be rendered via React Portal to ensure proper z-index stacking above all page content.
- **TR-002**: Modal MUST implement focus trap (tab cycling within modal boundaries) and restore focus to the triggering element on close.
- **TR-003**: Recipient search API calls MUST be debounced at 300ms and cancelled if the component unmounts or the query changes.
- **TR-004**: Image uploads MUST use presigned URLs or a dedicated upload endpoint (POST /api/kudos/upload-image) with client-side validation for file type and size before upload begins.
- **TR-005**: Rich text content MUST be serialized to a structured format (e.g., HTML or Tiptap JSON) for storage and rendered consistently in the kudos feed.
- **TR-006**: Form state MUST be managed with React state (useState/useReducer) or a form library (e.g., React Hook Form) with proper validation schema (e.g., Zod).
- **TR-007**: All API requests from the modal MUST include the Supabase auth token and handle 401 responses by redirecting to Login.
- **TR-008**: Modal open/close animations MUST use CSS transitions or Framer Motion with 200ms duration to match design specifications.

### State Management

| State | Type | Default | Description |
|-------|------|---------|-------------|
| isOpen | boolean | false | Controls modal visibility; set true when send-kudos bar is clicked |
| recipient | User \| null | null | Selected recipient user object |
| recipientQuery | string | "" | Current text in the recipient search input |
| recipientResults | User[] | [] | Autocomplete search results for recipient |
| isSearching | boolean | false | Loading state for recipient search API call |
| badgeTitle | string | "" | Selected badge/title value |
| messageContent | RichTextJSON | empty | Rich text editor content in structured format |
| hashtags | string[] | [] | Array of selected hashtag strings (1-5) |
| images | UploadedImage[] | [] | Array of uploaded image objects with URL and thumbnail |
| isAnonymous | boolean | false | Whether to send the kudos anonymously |
| isSubmitting | boolean | false | Loading state for form submission |
| validationErrors | Record<string, string> | {} | Map of field name to error message for inline validation |
| isDirty | boolean | false | Tracks if any field has been modified from default |

### Key Entities

- **Kudos**: The kudos post entity -- contains sender_id, receiver_id, badge_type, message (rich text), hashtags (array), image_urls (array), is_anonymous (boolean), created_at
- **User**: User profile entity -- contains id, full_name, avatar_url, department_code, email
- **UploadedImage**: Transient entity for image attachments -- contains file (File object), preview_url (blob URL), upload_url (server URL after upload), status (pending/uploading/uploaded/error)

---

## API Dependencies

| Endpoint | Method | Purpose | Status |
|----------|--------|---------|--------|
| /api/kudos | POST | Submit a new kudos post with all form data | New |
| /api/kudos/upload-image | POST | Upload a single image attachment, returns image URL | New |
| /api/users/search | GET | Search users by name for recipient autocomplete (?q=query&limit=10) | New |

### POST /api/kudos

**Request Body**:
```json
{
  "receiver_id": "uuid",
  "badge_type": "string",
  "message": "rich-text-json-or-html",
  "hashtags": ["string"],
  "image_urls": ["string"],
  "is_anonymous": false
}
```

**Response (201)**:
```json
{
  "id": "uuid",
  "created_at": "ISO-8601"
}
```

**Error Response (400)**:
```json
{
  "error": "validation_error",
  "details": {
    "field": "error message"
  }
}
```

### POST /api/kudos/upload-image

**Request**: multipart/form-data with `file` field

**Response (200)**:
```json
{
  "url": "https://storage.supabase.co/...",
  "thumbnail_url": "https://storage.supabase.co/..."
}
```

### GET /api/users/search?q={query}&limit=10

**Response (200)**:
```json
{
  "users": [
    {
      "id": "uuid",
      "full_name": "Nguyen Van A",
      "avatar_url": "https://...",
      "department_code": "D3"
    }
  ]
}
```

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: User can open the Write Kudo modal, fill all required fields, and submit successfully within 60 seconds on a stable connection.
- **SC-002**: Form validation catches 100% of invalid submissions (empty required fields, self-kudos, oversized images, wrong file types) before any API call is made.
- **SC-003**: After successful submission, the new kudos post appears in the Live Board feed within 2 seconds without requiring a full page reload.
- **SC-004**: Modal open/close animations render at 60fps with no visible jank on mid-range devices.
- **SC-005**: Image uploads complete within 5 seconds per image on a 10Mbps connection.
- **SC-006**: Recipient autocomplete results appear within 500ms of the user stopping typing.
- **SC-007**: All form interactions (toolbar buttons, hashtag chips, image remove) respond within 100ms of user input.

---

## Out of Scope

- **Kudos editing**: Users cannot edit a kudos post after submission. This is a future enhancement.
- **Kudos drafts**: Auto-saving draft kudos for later completion is not included.
- **Recipient multi-select**: The form supports a single recipient only. Sending kudos to multiple recipients at once is a future enhancement.
- **Scheduled sending**: Kudos are sent immediately; scheduling for a future time is not supported.
- **GIF/sticker picker**: Only static image uploads are supported; no inline GIF search or sticker functionality.
- **Real-time collaboration**: Multiple users editing the same kudos draft simultaneously is not applicable.
- **Badge/title creation**: Users select from predefined badges; creating custom badges is admin-only and out of scope.

---

## Dependencies

- [x] Constitution document exists (`.momorph/constitution.md`)
- [ ] API specifications available (`.momorph/API.yml`)
- [ ] Database design completed (`.momorph/database.sql`)
- [x] Screen flow documented (`.momorph/SCREENFLOW.md`)
- [x] Sun* Kudos Live Board spec completed (`.momorph/specs/MaZUn5xHXZ-SunKudosLiveBoard/spec.md`)
- [ ] User search API endpoint implemented
- [ ] Supabase Storage bucket configured for kudos image uploads
- [ ] Rich text editor library selected and integrated (e.g., Tiptap, Slate, or Lexical)

---

## Notes

- The modal is referenced in User Story 2 of the Sun* Kudos Live Board spec (MaZUn5xHXZ) as the target interaction when clicking the send-kudos input bar. This spec provides the detailed breakdown of that modal.
- The "Tieu chuan cong dong" (Community standards) link in the toolbar should link to a community guidelines page. The target URL should be confirmed with the product team.
- Badge/title options ("Danh hieu") need to be defined by the product team. The implementation should support a configurable list fetched from the backend or defined as constants.
- Anonymous kudos ("Gui an danh") should replace the sender info with a generic "Anonymous Sunner" identity on the published card. The backend must still record the actual sender for moderation purposes.
- The rich text editor library choice (Tiptap recommended for React 19 compatibility) should be finalized during the planning phase. The spec is library-agnostic.
