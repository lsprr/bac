interface HeaderProps {
    title: string;
}

const Header = ({ title }: HeaderProps) => {
    return (
        <header>
            <h2 className="text-2xl font-bold mt-5">
                {title}
            </h2>
        </header>

    );
}

export default Header;