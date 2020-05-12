class Cmd {
  async run(cmd: Array<string>): Promise<boolean> {
    const process = Deno.run({ cmd: cmd });
    const status = await process.status();
    process.close();
    return status.success;
  }
}

export default Cmd;
