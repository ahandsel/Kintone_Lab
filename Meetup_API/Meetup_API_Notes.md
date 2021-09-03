# Meetup API Notes

## Meetup.com Events API

| Name                                                                                 | Method | Ending                  |
| ------------------------------------------------------------------------------------ | ------ | ----------------------- |
| [Group Events](https://www.meetup.com/meetup_api/docs/:urlname/events/#list)         | GET    | `/:urlname/events`      |
| [Create Event](https://www.meetup.com/meetup_api/docs/:urlname/events/#list)         | POST   | `/:urlname/events`      |
| [Get Event](https://www.meetup.com/meetup_api/docs/:urlname/events/:id/#get)         | GET    | `/:urlname/events/:id`  |
| [Find Upcoming Events](https://www.meetup.com/meetup_api/docs/find/upcoming_events/) | GET    | `/find/upcoming_events` |
| [Member Calendar](https://www.meetup.com/meetup_api/docs/self/calendar/)             | GET    | `/self/calendar`        |
| [Member Events](https://www.meetup.com/meetup_api/docs/self/events/)                 | GET    | `/self/events`          |

## Group Events

* [Group Events | Meetup Doc](https://www.meetup.com/meetup_api/docs/:urlname/events/#list)
* GET: `/:urlname/events`
* Gets a listing of all Meetup Events hosted by a target group, in ascending order by default

```text

https://api.meetup.com/Kintone-Developers/events?page=1&status=upcoming

"0": {
  "name": "React & REST API: GET & POST to a Web Database!",
  "local_date": "2021-06-24",
  "local_time": "18:00",
  "link": "https://www.meetup.com/kintone-developers/events/278319728/",



```
