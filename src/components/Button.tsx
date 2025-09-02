export interface Props {
  children?: string;
  color?: "primary" | "secondary" | "danger";
  onClick: () => void;
}

const Button = (props: Props) => {
  const { children, onClick, color = "primary" } = props;
  return (
    <button className={"btn btn-" + color} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
