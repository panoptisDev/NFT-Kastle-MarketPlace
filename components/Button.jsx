const primaryBtn =
  "nft-gradient text-sm minlg:text-lg py-2 px-6 minlg:py-4 minlg:px-8 font-poppins font-semibold text-white";
const outlineBtn =
  "border border-nft-red-violet dark:text-white text-nft-black-1 bg-transparent font-poppins font-semibold text-sm minlg:text-lg py-2 px-6 minlg:py-4 minlg:px-8";

const Button = ({ btnName, classStyles, btnType, handleClick }) => (
  <button
    type="button"
    className={
      btnType === "primary"
        ? `${primaryBtn} ${classStyles}`
        : `${outlineBtn} ${classStyles}`
    }
    onClick={handleClick}
  >
    {btnName}
  </button>
);

export default Button;
