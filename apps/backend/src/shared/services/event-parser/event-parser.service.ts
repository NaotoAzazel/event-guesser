import { Injectable } from '@nestjs/common';
import wiki from 'wikipedia';
import { WikiEvent } from '../../models/wiki-event.model';

@Injectable()
export class EventParserService {
  async getEvent(day: string, month: string): Promise<WikiEvent[]> {
    const result = await wiki.onThisDay({ type: 'events', day, month });

    return (
      result.events?.map((info) => {
        return {
          title: info.text,
          pictures: info.pages.reduce((acc, page) => {
            if (page.originalimage?.source) {
              acc.push(page.originalimage.source);
            }

            return acc;
          }, [] as string[]),
        };
      }) ?? []
    );
  }
}
