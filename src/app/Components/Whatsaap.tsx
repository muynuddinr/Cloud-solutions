import React from 'react';

// Define the props for the component
interface WhatsAppButtonProps {
  phoneNumber: string; // The phone number to message (include country code, no '+', spaces, or dashes)
  message?: string; // An optional pre-filled message
  ariaLabel?: string; // Accessibility label
}

/**
 * A floating WhatsApp icon button component for Next.js and Tailwind CSS.
 * When clicked, it opens a WhatsApp chat with a pre-filled message.
 */
const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  message = 'Hello! I have a question.',
  ariaLabel = 'Chat with us on WhatsApp',
}) => {
  // Encode the message for the URL
  const encodedMessage = encodeURIComponent(message);

  // Construct the WhatsApp URL
  const whatsappUrl = `https://wa.me/${9629466826}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-110 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300"
    >
      {/* WhatsApp SVG Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true" // Hide from screen readers as the link has an aria-label
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.487 5.235 3.487 8.413 0 6.557-5.338 11.892-11.894 11.892-1.99 0-3.903-.52-5.586-1.456l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.447-4.435-9.884-9.888-9.884-5.448 0-9.886 4.434-9.889 9.884-.001 2.225.651 4.315 1.731 6.086l.001.004-1.27 4.625 4.749-1.246zm11.391-5.611c-.338-.168-1.996-.983-2.308-1.096-.312-.112-.54-.168-.768.168-.227.336-.873 1.096-1.071 1.314-.198.217-.396.245-.734.077-1.111-.564-2.115-1.242-2.992-2.053-.687-.629-1.14-1.428-1.274-1.688-.133-.26-.008-.396.159-.552.152-.14.338-.378.507-.565.169-.187.226-.312.338-.52.112-.208.056-.396-.028-.564-.084-.168-.768-1.844-1.05-2.53-.274-.674-.552-.582-.768-.592-.207-.009-1.27.112-1.742.868-.336.54-.873 1.27-1.15 1.742-.312.52-.425.868-.14 1.488.425.96 1.24 2.19 1.742 2.766 1.27 1.488 2.39 2.91 3.52 3.868 1.405 1.192 2.36 1.522 3.41 1.522.613 0 1.27-.2 1.742-.564.564-.425 1.05-1.111 1.27-1.488.2-1.025.1-1.844-.028-2.052z" />
      </svg>
      <span className="sr-only">{ariaLabel}</span>
    </a>
  );
};

export default WhatsAppButton;
