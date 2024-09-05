import style from "./index.module.scss";

interface tabProps {
  selectedMode: string;
  modes: string[];
  onChange: (mode: string) => void;
}

function PreviewTab(props: tabProps) {
  const { selectedMode, modes, onChange } = props;
  const tabs = modes.map((mode) => (
    <div
      className={`${style.mode} ${selectedMode === mode ? style.active : ""}`}
      key={mode}
      onClick={() => {
        onChange(mode);
      }}
    >
      {mode}
    </div>
  ));

  return <div className={style.modes}>{tabs}</div>;
}
export default PreviewTab;
