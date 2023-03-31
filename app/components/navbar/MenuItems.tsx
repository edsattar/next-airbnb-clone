"use client";
interface MenuItemsProps {
  onClick?: () => void;
  label: string;
}

export const MenuItems = ({ onClick, label }: MenuItemsProps): JSX.Element => {
  return (
    <div
      onClick={onClick}
      className="px-4 py-3 hover:bg-neutral-100 transtion font-semibold"
    >
      {label}
    </div>
  );
};
