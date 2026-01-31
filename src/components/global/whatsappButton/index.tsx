"use client";

const WhatsAppFloatingButton = () => {
  const phoneNumber: string = process.env.NEXT_PUBLIC_ADMIN_PHONE_NUMBER_WHATSAPP || "+917579134676";
  return (
    <div className="fixed bottom-5 right-5 z-50 group">
      
      {/* Tooltip */}
      <span className="absolute right-16 top-1/2 -translate-y-1/1 bg-black text-white text-xs px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition">
        Chat with us
      </span>
      
      {/* Button */}
      <a
        href={`https://wa.me/${phoneNumber}?text=Hello%20Divya%20Tour%20and%20Treks%20Support%2C%20I%20need%20assistance%20with...`}
        target="_blank"
        className="fixed bottom-5 right-5 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition transform hover:scale-110"
      >
        {/* <MessageCircle size={26} /> */}
        <img
          src="/whatsapp.svg"
          alt="Message"
          width={26}
          height={26}
        />

      </a>
    </div>
  );
}


export default WhatsAppFloatingButton;