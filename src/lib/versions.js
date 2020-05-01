import execute from "./execute";

export default function versions() {
  execute(`gcloud --version`);
}