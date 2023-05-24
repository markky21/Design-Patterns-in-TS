interface Device {
  isEnabled(): boolean;
  enable(): void;
  disable(): void;
  getVolume(): number;
  setVolume(percent: number): void;
  getChannel(): number;
  setChannel(channel: number): void;
}

class TV implements Device {
  private channel: number = 0;
  private volume: number = 0;
  private enabled: boolean = false;

  disable(): void {
    console.log("TV disabled");
    this.enabled = false;
  }

  enable(): void {
    console.log("TV enabled");
    this.enabled = true;
  }

  getChannel(): number {
    return this.channel;
  }

  setChannel(channel: number): void {
    this.channel = channel;
  }

  getVolume(): number {
    return this.volume;
  }

  setVolume(percent: number): void {
    this.volume = percent;
  }

  isEnabled(): boolean {
    return this.enabled;
  }
}

class Radio {
  private channel: number = 0;
  private volume: number = 0;
  private enabled: boolean = false;

  disable(): void {
    console.log("Radio disabled");
    this.enabled = false;
  }

  enable(): void {
    console.log("Radio enabled");
    this.enabled = true;
  }

  getChannel(): number {
    return this.channel;
  }

  setChannel(channel: number): void {
    this.channel = channel;
  }

  getVolume(): number {
    return this.volume;
  }

  setVolume(percent: number): void {
    this.volume = percent;
  }

  isEnabled(): boolean {
    return this.enabled;
  }
}

class RemoteControl {
  constructor(protected device: Device) {}

  togglePower() {
    this.device.isEnabled() ? this.device.disable() : this.device.enable();
  }

  volumeDown() {
    const currentVolume = this.device.getVolume();
    this.device.setVolume(currentVolume - 10);
    console.log("volume:", this.device.getVolume());
  }

  volumeUp() {
    const currentVolume = this.device.getVolume();
    this.device.setVolume(currentVolume + 10);
    console.log("volume:", this.device.getVolume());
  }

  channelDown() {
    const currentChannel = this.device.getChannel();
    this.device.setChannel(currentChannel - 1);
    console.log("channel:", this.device.getChannel());
  }

  channelUp() {
    const currentChannel = this.device.getChannel();
    this.device.setChannel(currentChannel + 1);
    console.log("channel:", this.device.getChannel());
  }
}

class AdvancedRemoteControl extends RemoteControl {
  mute() {
    this.device.setVolume(0);
    console.log("volume:", this.device.getVolume());
  }
}

/**
 * Usage
 */

const tv = new TV();
const remote = new RemoteControl(tv);
remote.togglePower();
remote.volumeUp();
remote.volumeUp();
remote.volumeDown();
remote.togglePower();

const radio = new Radio();
const advancedRemote = new AdvancedRemoteControl(radio);
advancedRemote.togglePower();
advancedRemote.volumeUp();
advancedRemote.volumeUp();
advancedRemote.mute();
advancedRemote.togglePower();
