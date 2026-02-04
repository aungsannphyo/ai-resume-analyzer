const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="text-center py-8 text-slate-500 text-sm font-medium">
      <p>&copy; {year} AI JD Generator. Powered by Groq Llama 3.</p>
    </footer>
  );
};

export default Footer;
