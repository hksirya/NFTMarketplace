const Button = ({ btnName, classStyles, handleClick }) => (
  <button
    type="button"
    className={`nft-gradient text-sm minlg:text-lg py-2 px-6 minlg:px-8 font-Poppins font-semibold text-white ${classStyles}`}
    onClick={handleClick}
  >
    {btnName}
  </button>
);

export default Button;
