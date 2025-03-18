import { Veg } from "./interfaces/Veg";

export const TITLES = {
  cash: "cash",
  security: "security",
};

export const MONTHS = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

export const YEARS = [{ value: 2024, label: "2024" }];

export const VEG_CODES: Veg[] = [
  { title: "רוקט", code: "136", correctNum: 0, inputValue: "" },
  { title: "שומר", code: "73", correctNum: 0, inputValue: "" },
  { title: "שום", code: "60", correctNum: 0, inputValue: "" },
  { title: "תפוח עץ", code: "92", correctNum: 0, inputValue: "" },
  { title: "תפוח פינק", code: "96", correctNum: 0, inputValue: "" },
  { title: "אבוקדו", code: "61", correctNum: 0, inputValue: "" },
  { title: "אגס", code: "84", correctNum: 0, inputValue: "" },
  { title: "אפרסק- אפרשזיף", code: "85", correctNum: 0, inputValue: "" },
  { title: "בצל סגול", code: "57", correctNum: 0, inputValue: "" },
  { title: "בצל לבן", code: "56", correctNum: 0, inputValue: "" },
  { title: "מלון", code: "81", correctNum: 0, inputValue: "" },
  { title: "בטטה", code: "59", correctNum: 0, inputValue: "" },
  { title: "גזר", code: "42", correctNum: 0, inputValue: "" },
  { title: "ברוקולי", code: "135", correctNum: 0, inputValue: "" },
  { title: "דלעת", code: "76", correctNum: 0, inputValue: "" },
  { title: "חציל", code: "49", correctNum: 0, inputValue: "" },
  { title: "תפוח אדמה לבן", code: "58", correctNum: 0, inputValue: "" },
  { title: "תפוח אדמה אדום", code: "79", correctNum: 0, inputValue: "" },
  { title: "כרוב לבן", code: "43", correctNum: 0, inputValue: "" },
  { title: "כרוב סגול", code: "44", correctNum: 0, inputValue: "" },
  { title: "כרובית", code: "47", correctNum: 0, inputValue: "" },
  { title: "מלפפון", code: "41", correctNum: 0, inputValue: "" },
  { title: "בננה", code: "100", correctNum: 0, inputValue: "" },
  { title: "ענבים ירוקים", code: "90", correctNum: 0, inputValue: "" },
  { title: "ענבים שחורים", code: "91", correctNum: 0, inputValue: "" },
  { title: "פומלה", code: "108", correctNum: 0, inputValue: "" },
  { title: "גמבה", code: "52", correctNum: 0, inputValue: "" },
  { title: "פלפל חריף", code: "78", correctNum: 0, inputValue: "" },
  { title: "קישוא", code: "50", correctNum: 0, inputValue: "" },
  { title: "אבטיח", code: "80", correctNum: 0, inputValue: "" },
];

export const netlifyUrl = "https://app.netlify.com/sites/work-lee/deploys";
export const githubUrl = "https://github.com/leeya018/work";

const today = new Date();
export const curr_m = today.getMonth() + 1;
export const curr_y = today.getFullYear();

export const getUrl = () => {
  return process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_BASIC_URL
    : process.env.NEXT_PUBLIC_BASIC_URL_PRODUCTION;
};
