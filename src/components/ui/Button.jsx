// src/components/ui/Button.jsx
const Button = ({ children, onClick, className = 'bg-blue-600 hover:bg-blue-700', type = 'button' }) => {
  return (
    <button 
      type={type}
      onClick={onClick} 
      className={`text-white font-bold py-2 px-4 rounded-lg transition-colors ${className || ''}`}
    >
      {children}
    </button>
  )
}

export default Button