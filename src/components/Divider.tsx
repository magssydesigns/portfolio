/** The portfolio's standalone content-width divider - a single thin rule spanning the page's max-w-[1400px] container. Reused wherever a section needs a plain visual break (e.g. Footer, project hero transitions). */
export default function Divider() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
      <div className="border-t border-line" />
    </div>
  );
}
