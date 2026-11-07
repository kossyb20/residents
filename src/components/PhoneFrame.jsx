/** Holds one 390×844 screen: a rounded device frame on wide viewports, full-bleed on phones. */
export default function PhoneFrame({ children }) {
  return (
    <div className="phone-stage">
      <div className="phone-frame">{children}</div>
    </div>
  );
}
