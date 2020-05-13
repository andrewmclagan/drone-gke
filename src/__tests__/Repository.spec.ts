import { assertEquals, assert } from "https://deno.land/std/testing/asserts.ts";
import { exists } from "https://deno.land/std/fs/mod.ts";
import {
  stub,
  Stub,
} from "https://raw.githubusercontent.com/udibo/mock/v0.3.0/stub.ts";
import { base64Decode } from "../utils.ts";
import Repository from "../Repository.ts";
import Cmd from "../Cmd.ts";

const config: any = {
  remote: "git@github.com:andrewmclagan/drone-gke.git",
  branch: "develop",
};

const path: string = "/tmp/drone-gke";

Deno.test({
  name: "it can clone a repository",
  async fn(): Promise<void> {
    const cmd = new Cmd();
    const run: Stub<Cmd> = stub(cmd, "run");

    let repository = new Repository(config, cmd);
    await repository.clone(path);

    const command: string[] = run.calls[0].args[0];

    assertEquals(command[0], "git");
    assertEquals(command[1], "clone");
    assertEquals(command[2], "--single-branch");
    assertEquals(command[3], `--branch=${config.branch}`);
    assertEquals(command[4], "--depth=1");
    assertEquals(command[5], config.remote);
    assertEquals(command[6], path);
  },
});

Deno.test({
  name: "it can use private key to clone a repository",
  async fn(): Promise<void> {
    const cmd = new Cmd();
    const run: Stub<Cmd> = stub(cmd, "run");

    const configWithPrivateKey: any = {
      ...config,
      sshKey: base64Decode(
        "LS0tLS1CRUdJTiBPUEVOU1NIIFBSSVZBVEUgS0VZLS0tLS0KYjNCbGJuTnphQzFyWlhrdGRqRUFBQUFBQkc1dmJtVUFBQUFFYm05dVpRQUFBQUFBQUFBQkFBQUNGd0FBQUFkemMyZ3RjbgpOaEFBQUFBd0VBQVFBQUFnRUF5bmRGbHVWSlU2aG9kSTF1c3lOcWg4UVNMYzBxRk54dVFkQlRJSjNiWDAvaW8yV2dYeXdNCkdDTUovWEk3NlMwZk1GN1ZXc0xrWTlkbmVmNGM1ZG90a2tPMyttVnBBWmEyZnRsbGIvaDgwSHprbnZVc1NFbXlLM2YrL0sKM1BNR0VuQksrWlFVajhwNzdSU2ZvTXpVaFhORW1xMU4rZ3NtNVZqSFdTZGtOQ0tIdkYwZ1BVaFhmNDkra3pWWmtkc2FIdgp3dERMbXltMWU3VUczTVZBSlN1T05XRlF3RjcwcVB5d2NMSVNiMThGQWtqN0F6MTNsQS9OLzArUVZhSzB2dEtKR08yVEJhCmk5clg0VG4rSlJ2Sk9xdC8xTEd4NmNnU1pRNHgrSFBnWVRWRjNjcGRIODdzYUdNeUdpUG5SY3RxWkc2ZkhpUmpBYlB6TSsKQ3FnamlBVXJnam92Z253dlV3SUlJQ1hJY3l1OXJ2YTVpSFNsMC9yaHRJa1pKb1ZHSCtQWVUzK0w4S0JFS0NKS1VadnIvVgpxaHlLNEVrV2dRMG5xWEFoaFVxNXZWS3ZTSDZNc1U2VmpqQ1c2d1V1Vk9QdWFNY0U5c3FHQnhXNktzK0RIam85OTAwM1F6CjZxR3NYOWI2K2ZqTnQ4cEY0bHJjM1JSL1dZTzh6SmFVbjZTUDhteGk3MzBkRDA3RWdrTEQrVjdNV2NQeEFYN0hya25XN3EKdkoxZk5tSXlRTnhNOFc5QkVrWGtuMmx0bUgyUTNYL0RLbFJGeUN5UjJ0cStXb0dPRG5RUXF2L3Q4ak1aaDV4UnlaYlFtVApXcGZVZGtrZVdFWVV3SlFOVHFPOStraFdsV0s0VitGVW42QVJFR2dDNjZPMTNIY0sxRklQVjcwSDNCNmtoTlZ2L3ZwM3NwCmNBQUFkUVFTcURHMEVxZ3hzQUFBQUhjM05vTFhKellRQUFBZ0VBeW5kRmx1VkpVNmhvZEkxdXN5TnFoOFFTTGMwcUZOeHUKUWRCVElKM2JYMC9pbzJXZ1h5d01HQ01KL1hJNzZTMGZNRjdWV3NMa1k5ZG5lZjRjNWRvdGtrTzMrbVZwQVphMmZ0bGxiLwpoODBIemtudlVzU0VteUszZisvSzNQTUdFbkJLK1pRVWo4cDc3UlNmb016VWhYTkVtcTFOK2dzbTVWakhXU2RrTkNLSHZGCjBnUFVoWGY0OStrelZaa2RzYUh2d3RETG15bTFlN1VHM01WQUpTdU9OV0ZRd0Y3MHFQeXdjTElTYjE4RkFrajdBejEzbEEKL04vMCtRVmFLMHZ0S0pHTzJUQmFpOXJYNFRuK0pSdkpPcXQvMUxHeDZjZ1NaUTR4K0hQZ1lUVkYzY3BkSDg3c2FHTXlHaQpQblJjdHFaRzZmSGlSakFiUHpNK0NxZ2ppQVVyZ2pvdmdud3ZVd0lJSUNYSWN5dTlydmE1aUhTbDAvcmh0SWtaSm9WR0grClBZVTMrTDhLQkVLQ0pLVVp2ci9WcWh5SzRFa1dnUTBucVhBaGhVcTV2Vkt2U0g2TXNVNlZqakNXNndVdVZPUHVhTWNFOXMKcUdCeFc2S3MrREhqbzk5MDAzUXo2cUdzWDliNitmak50OHBGNGxyYzNSUi9XWU84ekphVW42U1A4bXhpNzMwZEQwN0VnawpMRCtWN01XY1B4QVg3SHJrblc3cXZKMWZObUl5UU54TThXOUJFa1hrbjJsdG1IMlEzWC9ES2xSRnlDeVIydHErV29HT0RuClFRcXYvdDhqTVpoNXhSeVpiUW1UV3BmVWRra2VXRVlVd0pRTlRxTzkra2hXbFdLNFYrRlVuNkFSRUdnQzY2TzEzSGNLMUYKSVBWNzBIM0I2a2hOVnYvdnAzc3BjQUFBQURBUUFCQUFBQ0FRQzR0dTQvUjdxSlgzakU5US9NMFgvc2sxNStlTkp1cTlqUApwSTlpajRKSHg2c2VwYVlWamlzT2psRWI4RzltUWV0Vmh2K2h5WEx5LzkrQTlleEphNjd0NVdoaFFzbjFVQm41U3I5MzB6CjJVUEkyYjFGUnRNd2NoRDE0TUMwcWVlZFJPT3lKWDVJM1ZRSXJTc2hXaDUrRGZiR0kxeWp4aTdiU1E2K2NPakRnOGxRZWEKbmpIeS9zeWU2UndUZVJrVktZZUR0bGc3bkdiZGtQL014UXpMbkp3bWFUMXg5Ry9FQ0oyMGcxRzhWL1ZLNjJoT3dYSnFHNgowMXc5SUx2dUNsdzVDZXRJalF2ZTBtN29KYStQRFhXZVdEN012cjF4YXo0VkFrbG13ZGt3OXBoaVM3Q0FSNWw1ZHg2THFMCnZqK2p4N21rMERBL0ZyNlUvMXdYL3VSRHdXdTV5VG9xM21SeWEwTWdmakFub1dOaXFNUWl0US9oby9iMVZEamhIM3dDNHYKWnZzUDA2UC9KeEFRVGs3VVE3T0sxRWl5NmpTWkc2b0dkTU84VjRHUTAvSXdLaitESFppRnRFU0J6ck1HTzFBZkFMQWxmMgp0WXR3UlUraFJZWnp4V2lTb2JWOE5tZGcrbk9hU0xjTWpyYmJIZG9jOFVWbnBQVlAvdHFreWd1TFpocXBVQmZPN3NxbnMzClE3cmZkbmNXLys5ck1GUXFVaVdnRGhHNjB4cWZBbU9EdGltdjd6MUVhMnpGSFlnL0krS3pVaUVGek1aMW9GbUNxeVpLM2wKazFIT1JiZkNyKytNdlI2UW9NZ0M1azlseDdTSnZ1a1VWWUlScDIvWExUNko5Yk13d1RwdHhlZDRJS2Jha0oxYWxWazJZZwpNYUEvMStIclE1WWVzallrWWVZUUFBQVFFQXdwdGtreVZ6b3JTNWQ2SWxLemQrci95VWdacjJ1alZHMTNReWhGN3BqV2dGClRiWWVFNDY3b1pPYm9DRHNrN3FucnZOSkhBRUtCS2V3M2MvWlBIN2FZdncrcThVcGp1bEVJbHpNMEFIQlNHeEhXd2ozU2YKQTVUaWZQR1lES0loWTFFeFZTSmdKWDhnanAwcnBQLzV4N1EwYWQ5UEdMa0dtN0JZWHVYTUVNY0lTbExBRFpMd3hLTzhaaQpXT2hiMGJ5b1EwWGtvQXgrU2FnM20yWHYrQXZYZDZybTFiYTBDaWJjV0d3THI5TG40U3NxMmRzeitDQ0RlOWJmR01CRFBQCk16WXhlbjJSRnhSUnR2YUxUaUl5SzJEVHpndWZQTlFmRERGODhZR3RMVFJaeEhvZmVXQmtJMm5ETTNUR2kxcmt6cUVwdWQKWEZBMGoyekpIcGlaVDd1bjlBQUFBUUVBN1B5UEpQM05RaExBOXJJVHhUTGViTzFWalk2SFY3aTFkSnhKZ0NyaGM4QUhEZwpkbm5ZS1BTWitXZHcxZWZvQVhtREx2dHoySHphVXUwOVVsWnNkUktaQU9BUUJEN1ZINEgwblJnTFBCYlN6VkgycmUrMlRaCjVtbzQ1VjdxMklMbFpYcUVTaUFZL1ZqMUNGdUl0dWlBYnFjdzBZczNnUS9WR3pHYlUyUDFTZ09FRHkrRlBZL0xWS0ttcTEKYjNpSDYzajBHUG4vNDNsZW00Y0VjRWw2WDRNckdxdDlkQWdaVGtSekgycUlNSmFJb3VGcXlBSmZYc1VnOUhTck0vS1M2cQpBZVRlUjVHZndLaWc0ZVo0a2ZySnVFL1VFN3FzZHlmSWhDMCtWYmREUlc3cHV1dFFKVGhNWlIzaGFpMlVYMm9ud1NtYUxrCkNsN0VrRGszYVVFRGd0QndBQUFRRUEycld5WDYvTytZU0pQSHhvWk5JcjFYSU1VZzRqVjVlS2thSVlNYkc1QmgvWk9GRHUKdkhEdndxNXltdE9Vbm1YT2RIZDdIT0FSTFhwZTV3aFNRYkFFNCtBR0FRdElsTytvYU9qQ0pvdnoxTlVFRkkvcDNrdEZjWApoeTJjR1NRZzBBanBqdjZmZUljdTZ4NmV0aXZoUUVzbUd6aHBhYUlnZWthaENuVTZaQmljNlJWTDBqNWNaN3NKVXRncVh0Ck1ReURrQS9WTFFQdTk5SnhsMnhyL0F4cG16WWFySGJhbTZoL1dMMitUWkRZNDJWVUZYZjNrdnV5Zi9LUkdhakhIcG9LMFAKc2FWNlFIQWlpcUpSaFd6Mlp3Y1hrRkZVdzlUSlplb0xuSGNHdXlaY2NUV21GaW9Dd3FuRDFWY2lHRHBuMzB0YTJzVEZ3dwpWOHRLMXBUWnZ3dDU4UUFBQUJkaGJtUnlaWGR0WTJ4aFoyRnVRR2R0WVdsc0xtTnZiUUVDCi0tLS0tRU5EIE9QRU5TU0ggUFJJVkFURSBLRVktLS0tLQo="
      ),
    };

    let repository = new Repository(configWithPrivateKey, cmd);
    await repository.clone(path);

    const command: string[] = run.calls[0].args[0];

    let sshKeyPath: string = command[1].split('-c core.sshCommand="ssh -i ')[1];
    sshKeyPath = sshKeyPath.substring(0, sshKeyPath.length - 1);

    assert(await exists(sshKeyPath));

    assertEquals(command[0], "git");
    assertEquals(command[1], `-c core.sshCommand="ssh -i ${sshKeyPath}"`);
    assertEquals(command[2], "clone");
    assertEquals(command[3], "--single-branch");
    assertEquals(command[4], `--branch=${config.branch}`);
    assertEquals(command[5], "--depth=1");
    assertEquals(command[6], config.remote);
    assertEquals(command[7], path);

    await Deno.remove(sshKeyPath);
  },
});
