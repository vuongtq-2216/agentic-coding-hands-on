export type ErrorCode =
  | "access_denied"
  | "server_error"
  | "cookies_required"
  | "unknown";

export type LoginError = {
  code: ErrorCode;
  message: string;
};

export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  access_denied: "Đăng nhập không thành công. Vui lòng thử lại.",
  server_error: "Đã xảy ra lỗi. Vui lòng thử lại sau.",
  cookies_required: "Vui lòng bật cookies để đăng nhập.",
  unknown: "Không thể kết nối. Vui lòng kiểm tra mạng.",
};
