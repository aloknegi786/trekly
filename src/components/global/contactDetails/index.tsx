type ContactItem = {
  label: string;
  value: string;
  icon?: React.ReactNode;
};

type Props = {
  contacts: ContactItem[];
  onClose: () => void;
};

export default function ContactDetails({ contacts, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6 relative animate-fadeIn">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">
          Contact Details
        </h2>

        <div className="space-y-4">
          {contacts.map((item, index) => (
            <div key={index} className="flex gap-3 items-center">
              {item.icon && <span className="text-gray-500">{item.icon}</span>}
              <div>
                <p className="text-sm text-gray-500">{item.label}</p>
                <p className="font-medium text-gray-900">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
