import { decode } from "../utils/base64.js";

export default class ConfigRepo {
  shell = undefined;

  publicKeyPath = "";

  privateKeyPath = "";

  constructor(shell, encodedPublicKey, encodedPrivateKey) {
    this.shell = shell;
    this.publicKeyPath = this._parsePublicKey(encodedPublicKey);
    this.privateKeyPath = this._parsePrivateKey(encodedPrivateKey);
  }

  clone(repo, branch, path) {
    this._createRepoDir(path);

    this.shell(`
      git clone -c core.sshCommand="ssh -i ${privateKeyPath}" --single-branch --branch ${branch} ${repo} ${path} --depth=3
    `);
  }

  _parsePublicKey(encodedPublicKey) {
    const decoded = this._decodeKeyFile(encodedPublicKey);
    return this._writeKeyFile("id_rsa.pub", decoded, 0o644);
  }

  _parsePrivateKey(encodedPrivateKey) {
    const decoded = this._decodeKeyFile(encodedPrivateKey);
    return this._writeKeyFile("id_rsa", decoded, 0o600);
  }

  _decodeKeyFile(encodedKey) {
    return decode(encodedKey);
  }

  _writeKeyFile(name, content, mode) {
    const path = `/tmp/${name}`;
    fs.writeFileSync(path, content, { mode });
    return path;
  }

  _createRepoDir(path) {
    this.shell(`mkdir -p ${path}`, false);
  }
}
