import { ProgressBar, ProgressRoot } from "./components/ui/progress";

export default function Loading() {
  return (
    <ProgressRoot maxW="240px" value={null}>
      <ProgressBar />
    </ProgressRoot>
  );
}
