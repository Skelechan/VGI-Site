import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TwitchStream} from '../api-models/TwitchStreams';
import {NgForOf, NgIf} from '@angular/common';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {TwitchVideo} from '../api-models/TwitchVideo';

@Component({
  selector: 'app-live',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './live.component.html',
  styleUrl: './live.component.css'
})
export class LiveComponent implements OnInit {
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {
    this._streams = [];
    this._streamsReady = false;
    this._vods = [];
    this._vodsReady = false;
    this._selectedStream = "";
  }

  private _streams: TwitchStream[];
  private _vods: TwitchVideo[];
  private _streamsReady: boolean;
  private _vodsReady: boolean;
  private _selectedStream: string;
  public get selectedStream(): TwitchStream {
    // Find the stream matching the saved display name, or return the first stream as a fallback
    return this._streams.find(stream => stream.displayName === this._selectedStream) || this._streams[0];
  }
  public set selectedStream(stream: TwitchStream) {
    // Update the selected stream display name
    this._selectedStream = stream.displayName;
  }
  public get otherStreams(): TwitchStream[] {
    // Find the streams that do not match the saved display name
    return this._streams.filter(stream => stream.displayName !== this._selectedStream);
  }
  public get selectedStreamUrl(): SafeResourceUrl | null {
    if (!this._selectedStream) {
      return null;
    }

    let unsafeUrl = `https://player.twitch.tv/?channel=${this._selectedStream}&parent=localhost`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl);
  }
  public get vods(): TwitchVideo[] {
    return this._vods;
  }

  ngOnInit(): void {
    this.GetStreams();
    this.GetVods();
  }

  private GetStreams() {
    this.http.get<TwitchStream[]>('https://api.insidevgi.com/twitch/streams').subscribe({
        next: (streams) =>  {
          this._streamsReady = true
          this._streams = streams

          if(this._streams.length > 0)
            this._selectedStream = this._streams[0].displayName;
        },
        error: () => {
          console.error('Error getting streams');
          this._streamsReady = true
        }
      }
    );
  }

  private GetVods() {
    this.http.get<TwitchVideo[]>('https://api.insidevgi.com/twitch/vods?size=4').subscribe({
        next: (streams) =>  {
          this._vods = streams
          this._vodsReady = true
        },
        error: () => {
          console.error('Error getting Vods');
          this._vodsReady = true
        }
      }
    );
  }

  public HasStreams() : boolean {
    return this._streams.length > 0;
  }

  public HasVods() : boolean {
    return this._vods.length > 0;
  }

  public hasOtherStreamers() {
    return this.otherStreams.length > 0;
  }

  public ready(): boolean {
    return this._streamsReady && this._vodsReady;
  }
}
