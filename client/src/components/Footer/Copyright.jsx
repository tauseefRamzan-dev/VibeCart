const Copyright = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="text-center text-muted mt-4 pt-3 border-top">
      VibeCart &copy; {currentYear} All Rights Reserved. Your one-stop destination for quality and affordable products. Developed By Mirza Tauseef Ramzan
    </div>
  );
};

export default Copyright;