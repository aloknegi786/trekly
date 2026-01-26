import { Mail, MapPin, Phone } from "lucide-react";

export const MENU_ITEMS = [
    {title: "Home", href: "/", hidden: true},
    {title: "Treks", href: "/trek", hidden: false},
    {title: "Profile", href: "/user/profile", hidden: false},
    {title: "About", href: "/about", hidden: true}
]

export const tabs = [
  { name: "Profile", path: "/user/profile" },
  { name: "History", path: "/user/history" },
];

export const BG_IMAGE_URL = "https://img.freepik.com/premium-vector/climbing-mountains-traveler-top-mountain-looks-beautiful-landscape-mountains-mountain-tourism-travel-hiking-vector_939711-7958.jpg?w=1480";

export const contacts = [
  { label: "Email", value: "divya@email.com", icon: <Mail size={20} /> },
  { label: "Phone", value: "+91 98765 43210", icon: <Phone size={20} /> },
  { label: "Address", value: "Uttar Pradesh, India", icon: <MapPin size={20} /> },
]