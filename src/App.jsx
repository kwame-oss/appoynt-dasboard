import { useState, useMemo, useEffect } from "react";

// ─── Google Sheets Config ────────────────────────────────────────────────────
// Replace SHEET_ID with your Google Sheet ID after setup
// Sheet must be published: File → Share → Publish to web → CSV
const BASE_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR-aGNoeN8XWYx35NjRhKPCOLIpdeuOkmWEnq4hGj4PIz6xqecoUBjEJQ_yGpjTMR0hQlrmSv-Z5EPJ/pub?single=true&output=csv";
const DIALLER_URL = BASE_URL + "&gid=0";
const SALES_URL   = BASE_URL + "&gid=928277321";
const AGENT_URL   = BASE_URL + "&gid=269149065";

// ─── Fallback Seed Data (used until Sheets is configured) ───────────────────
const SEED = [
  {
    date:"2026-05-05",partial:false,agents:4,
    dispositions:{noAns:553,voicemail:197,wrong:13,notInterested:20,dnc:4,callback:2,expired:69,finishedSystem:17,moving:0,langBarrier:0},
    timing:{previewAT:null,convAT:null},
    enrolled:0,
    agentData:[
      {name:"Anna Amponsah",calls:207,noAns:112,voicemail:76,wrong:3,notInterested:3,dnc:0,callback:0,expired:13,finishedSystem:0,moving:0,langBarrier:0,avgPreview:null,avgConv:null,enrolled:0},
      {name:"Abigal Duodom",calls:257,noAns:156,voicemail:48,wrong:3,notInterested:7,dnc:3,callback:2,expired:25,finishedSystem:10,moving:0,langBarrier:0,avgPreview:null,avgConv:null,enrolled:0},
      {name:"Frances Obaze",calls:188,noAns:140,voicemail:34,wrong:0,notInterested:1,dnc:0,callback:0,expired:8,finishedSystem:4,moving:0,langBarrier:0,avgPreview:null,avgConv:null,enrolled:0},
      {name:"Nick Baffour",calls:221,noAns:145,voicemail:39,wrong:7,notInterested:9,dnc:1,callback:0,expired:13,finishedSystem:3,moving:0,langBarrier:0,avgPreview:null,avgConv:null,enrolled:0},
    ]
  },
  {
    date:"2026-05-06",partial:false,agents:5,
    dispositions:{noAns:632,voicemail:254,wrong:100,notInterested:29,dnc:1,callback:2,expired:4,finishedSystem:14,moving:3,langBarrier:1},
    timing:{previewAT:null,convAT:null},
    enrolled:0,
    agentData:[
      {name:"Anna Amponsah",calls:207,noAns:121,voicemail:54,wrong:14,notInterested:9,dnc:0,callback:2,expired:2,finishedSystem:3,moving:0,langBarrier:0,avgPreview:null,avgConv:null,enrolled:0},
      {name:"Abigal Duodom",calls:251,noAns:158,voicemail:38,wrong:35,notInterested:9,dnc:0,callback:0,expired:0,finishedSystem:0,moving:1,langBarrier:0,avgPreview:null,avgConv:null,enrolled:0},
      {name:"Frances Obaze",calls:204,noAns:141,voicemail:49,wrong:6,notInterested:3,dnc:0,callback:0,expired:0,finishedSystem:3,moving:1,langBarrier:1,avgPreview:null,avgConv:null,enrolled:0},
      {name:"Nick Baffour",calls:210,noAns:126,voicemail:43,wrong:30,notInterested:7,dnc:0,callback:0,expired:0,finishedSystem:1,moving:0,langBarrier:0,avgPreview:null,avgConv:null,enrolled:0},
      {name:"Prince Selasie",calls:168,noAns:86,voicemail:70,wrong:15,notInterested:1,dnc:1,callback:0,expired:2,finishedSystem:7,moving:1,langBarrier:0,avgPreview:null,avgConv:null,enrolled:0},
    ]
  },
  {
    date:"2026-05-07",partial:false,agents:5,
    dispositions:{noAns:846,voicemail:221,wrong:176,notInterested:28,dnc:3,callback:0,expired:0,finishedSystem:16,moving:1,langBarrier:0},
    timing:{previewAT:null,convAT:null},
    enrolled:0,
    agentData:[
      {name:"Anna Amponsah",calls:276,noAns:147,voicemail:83,wrong:39,notInterested:7,dnc:0,callback:0,expired:0,finishedSystem:0,moving:0,langBarrier:0,avgPreview:"01:21",avgConv:"00:13",enrolled:0},
      {name:"Abigal Duodom",calls:228,noAns:145,voicemail:36,wrong:35,notInterested:6,dnc:3,callback:0,expired:0,finishedSystem:3,moving:0,langBarrier:0,avgPreview:"01:39",avgConv:"00:04",enrolled:0},
      {name:"Frances Obaze",calls:307,noAns:191,voicemail:69,wrong:37,notInterested:7,dnc:0,callback:0,expired:0,finishedSystem:3,moving:0,langBarrier:0,avgPreview:"01:16",avgConv:"00:07",enrolled:0},
      {name:"Nick Baffour",calls:222,noAns:140,voicemail:28,wrong:42,notInterested:6,dnc:0,callback:0,expired:0,finishedSystem:6,moving:0,langBarrier:0,avgPreview:"01:35",avgConv:"00:04",enrolled:0},
      {name:"Prince Selasie",calls:258,noAns:223,voicemail:5,wrong:23,notInterested:2,dnc:0,callback:0,expired:0,finishedSystem:4,moving:1,langBarrier:0,avgPreview:"01:38",avgConv:"00:07",enrolled:0},
    ]
  },
  {
    date:"2026-05-08",partial:false,agents:5,
    dispositions:{noAns:957,voicemail:210,wrong:126,notInterested:24,dnc:3,callback:1,expired:1,finishedSystem:9,moving:3,langBarrier:0},
    timing:{previewAT:"01:27",convAT:"00:06"},
    enrolled:0,
    agentData:[
      {name:"Anna Amponsah",calls:313,noAns:179,voicemail:86,wrong:41,notInterested:5,dnc:2,callback:0,expired:0,finishedSystem:0,moving:0,langBarrier:0,avgPreview:"01:15",avgConv:"00:09",enrolled:0},
      {name:"Abigal Duodom",calls:252,noAns:183,voicemail:39,wrong:25,notInterested:4,dnc:1,callback:0,expired:0,finishedSystem:0,moving:0,langBarrier:0,avgPreview:"01:28",avgConv:"00:04",enrolled:0},
      {name:"Frances Obaze",calls:274,noAns:181,voicemail:64,wrong:19,notInterested:9,dnc:0,callback:0,expired:0,finishedSystem:1,moving:0,langBarrier:0,avgPreview:"01:23",avgConv:"00:06",enrolled:0},
      {name:"Nick Baffour",calls:210,noAns:151,voicemail:21,wrong:30,notInterested:4,dnc:0,callback:0,expired:0,finishedSystem:4,moving:0,langBarrier:0,avgPreview:"01:50",avgConv:"00:04",enrolled:0},
      {name:"Prince Selasie",calls:285,noAns:263,voicemail:0,wrong:11,notInterested:2,dnc:0,callback:1,expired:1,finishedSystem:4,moving:3,langBarrier:0,avgPreview:"01:27",avgConv:"00:08",enrolled:0},
    ]
  },
  {
    date:"2026-05-11",partial:false,agents:5,
    dispositions:{noAns:905,voicemail:246,wrong:114,notInterested:30,dnc:2,callback:0,expired:0,finishedSystem:13,moving:0,langBarrier:0},
    timing:{previewAT:"01:24",convAT:"00:06"},
    enrolled:0,
    agentData:[
      {name:"Anna Amponsah",calls:304,noAns:163,voicemail:93,wrong:40,notInterested:7,dnc:1,callback:0,expired:0,finishedSystem:0,moving:0,langBarrier:0,avgPreview:"01:13",avgConv:"00:06",enrolled:0},
      {name:"Abigal Duodom",calls:232,noAns:171,voicemail:32,wrong:19,notInterested:6,dnc:0,callback:0,expired:0,finishedSystem:4,moving:0,langBarrier:0,avgPreview:"01:31",avgConv:"00:06",enrolled:0},
      {name:"Frances Obaze",calls:265,noAns:142,voicemail:88,wrong:27,notInterested:5,dnc:0,callback:0,expired:0,finishedSystem:3,moving:0,langBarrier:0,avgPreview:"01:26",avgConv:"00:07",enrolled:0},
      {name:"Nick Baffour",calls:230,noAns:164,voicemail:33,wrong:23,notInterested:7,dnc:1,callback:0,expired:0,finishedSystem:2,moving:0,langBarrier:0,avgPreview:"01:33",avgConv:"00:05",enrolled:0},
      {name:"Prince Selasie",calls:279,noAns:265,voicemail:0,wrong:5,notInterested:5,dnc:0,callback:0,expired:0,finishedSystem:4,moving:0,langBarrier:0,avgPreview:"01:19",avgConv:"00:07",enrolled:0},
    ]
  },
  {
    date:"2026-05-12",partial:false,agents:5,
    dispositions:{noAns:982,voicemail:209,wrong:81,notInterested:31,dnc:5,callback:2,expired:1,finishedSystem:9,moving:0,langBarrier:0},
    timing:{previewAT:"01:30",convAT:"00:05"},
    enrolled:0,
    agentData:[
      {name:"Anna Amponsah",calls:287,noAns:165,voicemail:86,wrong:25,notInterested:8,dnc:3,callback:0,expired:0,finishedSystem:0,moving:0,langBarrier:0,avgPreview:"01:11",avgConv:"00:05",enrolled:0},
      {name:"Abigal Duodom",calls:252,noAns:214,voicemail:21,wrong:8,notInterested:4,dnc:1,callback:0,expired:0,finishedSystem:4,moving:0,langBarrier:0,avgPreview:"01:30",avgConv:"00:04",enrolled:0},
      {name:"Frances Obaze",calls:263,noAns:165,voicemail:68,wrong:20,notInterested:7,dnc:0,callback:0,expired:0,finishedSystem:3,moving:0,langBarrier:0,avgPreview:"01:33",avgConv:"00:06",enrolled:0},
      {name:"Nick Baffour",calls:235,noAns:173,voicemail:34,wrong:18,notInterested:8,dnc:1,callback:0,expired:1,finishedSystem:0,moving:0,langBarrier:0,avgPreview:"01:46",avgConv:"00:03",enrolled:0},
      {name:"Prince Selasie",calls:283,noAns:265,voicemail:0,wrong:10,notInterested:4,dnc:0,callback:2,expired:0,finishedSystem:2,moving:0,langBarrier:0,avgPreview:"01:28",avgConv:"00:06",enrolled:0},
    ]
  },
  {
    date:"2026-05-13",partial:false,agents:5,
    dispositions:{noAns:1042,voicemail:177,wrong:69,notInterested:24,dnc:0,callback:0,expired:0,finishedSystem:15,moving:0,langBarrier:1},
    timing:{previewAT:"01:22",convAT:"00:04"},
    enrolled:0,
    agentData:[
      {name:"Anna Amponsah",calls:316,noAns:207,voicemail:76,wrong:25,notInterested:8,dnc:0,callback:0,expired:0,finishedSystem:0,moving:0,langBarrier:0,avgPreview:"01:10",avgConv:"00:05",enrolled:0},
      {name:"Abigal Duodom",calls:267,noAns:235,voicemail:16,wrong:8,notInterested:4,dnc:0,callback:0,expired:0,finishedSystem:4,moving:0,langBarrier:0,avgPreview:"01:25",avgConv:"00:02",enrolled:0},
      {name:"Frances Obaze",calls:225,noAns:132,voicemail:65,wrong:23,notInterested:1,dnc:0,callback:0,expired:0,finishedSystem:4,moving:0,langBarrier:0,avgPreview:"01:13",avgConv:"00:05",enrolled:0},
      {name:"Nick Baffour",calls:250,noAns:208,voicemail:20,wrong:8,notInterested:9,dnc:0,callback:0,expired:0,finishedSystem:5,moving:0,langBarrier:0,avgPreview:"01:29",avgConv:"00:04",enrolled:0},
      {name:"Prince Selasie",calls:270,noAns:260,voicemail:0,wrong:5,notInterested:2,dnc:0,callback:0,expired:0,finishedSystem:2,moving:0,langBarrier:1,avgPreview:"01:32",avgConv:"00:06",enrolled:0},
    ]
  },
  {
    date:"2026-05-14",partial:false,agents:5,
    dispositions:{noAns:1323,voicemail:270,wrong:132,notInterested:42,dnc:7,callback:3,expired:0,finishedSystem:18,moving:0,langBarrier:0},
    timing:{previewAT:"01:06",convAT:"00:06"},
    enrolled:0,
    agentData:[
      {name:"Anna Amponsah",calls:332,noAns:191,voicemail:90,wrong:42,notInterested:6,dnc:1,callback:0,expired:0,finishedSystem:2,moving:0,langBarrier:0,avgPreview:"01:02",avgConv:"00:07",enrolled:0},
      {name:"Abigal Duodom",calls:300,noAns:252,voicemail:20,wrong:13,notInterested:6,dnc:1,callback:0,expired:0,finishedSystem:8,moving:0,langBarrier:0,avgPreview:"01:11",avgConv:"00:03",enrolled:0},
      {name:"Frances Obaze",calls:505,noAns:306,voicemail:132,wrong:47,notInterested:17,dnc:2,callback:1,expired:0,finishedSystem:0,moving:0,langBarrier:0,avgPreview:"00:46",avgConv:"00:06",enrolled:0},
      {name:"Nick Baffour",calls:286,noAns:214,voicemail:28,wrong:27,notInterested:10,dnc:2,callback:0,expired:0,finishedSystem:5,moving:0,langBarrier:0,avgPreview:"01:23",avgConv:"00:05",enrolled:0},
      {name:"Prince Selasie",calls:373,noAns:360,voicemail:0,wrong:3,notInterested:3,dnc:1,callback:2,expired:0,finishedSystem:3,moving:0,langBarrier:0,avgPreview:"01:08",avgConv:"00:07",enrolled:0},
    ]
  },
  {
    date:"2026-05-15",partial:false,agents:5,
    dispositions:{noAns:1345,voicemail:302,wrong:115,notInterested:33,dnc:10,callback:1,expired:32,finishedSystem:10,moving:0,langBarrier:2},
    timing:{previewAT:"01:02",convAT:"00:07"},
    enrolled:0,
    agentData:[
      {name:"Anna Amponsah",calls:340,noAns:178,voicemail:113,wrong:43,notInterested:4,dnc:0,callback:0,expired:0,finishedSystem:0,moving:0,langBarrier:0,avgPreview:"01:04",avgConv:"00:10",enrolled:0},
      {name:"Abigal Duodom",calls:302,noAns:244,voicemail:22,wrong:27,notInterested:5,dnc:0,callback:0,expired:0,finishedSystem:0,moving:0,langBarrier:3,avgPreview:"01:17",avgConv:"00:03",enrolled:0},
      {name:"Frances Obaze",calls:474,noAns:281,voicemail:123,wrong:19,notInterested:10,dnc:1,callback:0,expired:31,finishedSystem:1,moving:0,langBarrier:1,avgPreview:"00:52",avgConv:"00:07",enrolled:0},
      {name:"Nick Baffour",calls:303,noAns:220,voicemail:44,wrong:25,notInterested:9,dnc:0,callback:1,expired:0,finishedSystem:0,moving:0,langBarrier:4,avgPreview:"01:21",avgConv:"00:05",enrolled:0},
      {name:"Prince Selasie",calls:432,noAns:422,voicemail:0,wrong:1,notInterested:5,dnc:0,callback:0,expired:1,finishedSystem:1,moving:0,langBarrier:2,avgPreview:"00:58",avgConv:"00:08",enrolled:0},
    ]
  },
  {
    date:"2026-05-16",partial:false,agents:5,
    dispositions:{noAns:1177,voicemail:315,wrong:169,notInterested:29,dnc:11,callback:1,expired:37,finishedSystem:16,moving:0,langBarrier:0},
    timing:{previewAT:"01:04",convAT:"00:07"},
    enrolled:0,
    agentData:[
      {name:"Anna Amponsah",calls:301,noAns:118,voicemail:102,wrong:70,notInterested:11,dnc:0,callback:0,expired:0,finishedSystem:0,moving:0,langBarrier:0,avgPreview:"01:06",avgConv:"00:11",enrolled:0},
      {name:"Abigal Duodom",calls:351,noAns:251,voicemail:36,wrong:46,notInterested:9,dnc:3,callback:0,expired:0,finishedSystem:6,moving:0,langBarrier:0,avgPreview:"00:59",avgConv:"00:06",enrolled:0},
      {name:"Frances Obaze",calls:431,noAns:244,voicemail:126,wrong:15,notInterested:2,dnc:6,callback:0,expired:37,finishedSystem:1,moving:0,langBarrier:0,avgPreview:"00:55",avgConv:"00:07",enrolled:0},
      {name:"Nick Baffour",calls:309,noAns:210,voicemail:50,wrong:34,notInterested:6,dnc:2,callback:0,expired:0,finishedSystem:7,moving:0,langBarrier:0,avgPreview:"01:18",avgConv:"00:04",enrolled:0},
      {name:"Prince Selasie",calls:363,noAns:354,voicemail:1,wrong:4,notInterested:1,dnc:0,callback:1,expired:0,finishedSystem:2,moving:0,langBarrier:0,avgPreview:"01:03",avgConv:"00:08",enrolled:0},
    ]
  },
  {
    date:"2026-05-18",partial:false,agents:5,
    dispositions:{noAns:1202,voicemail:293,wrong:111,notInterested:38,dnc:11,callback:2,expired:25,finishedSystem:13,moving:0,langBarrier:1},
    timing:{previewAT:"01:04",convAT:"00:08"},
        enrolled:0,
    agentData:[
      {name:"Anna Amponsah",calls:331,noAns:164,voicemail:113,wrong:48,notInterested:5,dnc:0,callback:0,expired:0,finishedSystem:1,moving:0,langBarrier:0,avgPreview:"01:03",avgConv:"00:09",enrolled:0},
      {name:"Abigal Duodom",calls:370,noAns:283,voicemail:41,wrong:28,notInterested:11,dnc:4,callback:1,expired:0,finishedSystem:2,moving:0,langBarrier:0,avgPreview:"00:59",avgConv:"00:06",enrolled:0},
      {name:"Frances Obaze",calls:311,noAns:176,voicemail:95,wrong:3,notInterested:7,dnc:3,callback:1,expired:24,finishedSystem:2,moving:0,langBarrier:0,avgPreview:"01:06",avgConv:"00:11",enrolled:0},
      {name:"Nick Baffour",calls:307,noAns:214,voicemail:44,wrong:31,notInterested:10,dnc:4,callback:0,expired:0,finishedSystem:3,moving:0,langBarrier:1,avgPreview:"01:13",avgConv:"00:05",enrolled:0},
      {name:"Prince Selasie",calls:377,noAns:365,voicemail:0,wrong:1,notInterested:5,dnc:0,callback:0,expired:1,finishedSystem:5,moving:0,langBarrier:0,avgPreview:"01:00",avgConv:"00:07",enrolled:0},
    ]
  },
  {
    date:"2026-05-19",partial:false,agents:5,
    dispositions:{noAns:1392,voicemail:240,wrong:95,notInterested:26,dnc:5,callback:1,expired:32,finishedSystem:14,moving:0,langBarrier:1},
    timing:{previewAT:"01:02",convAT:"00:06"},
        enrolled:0,
    agentData:[
      {name:"Anna Amponsah",calls:388,noAns:224,voicemail:121,wrong:35,notInterested:8,dnc:0,callback:0,expired:0,finishedSystem:0,moving:0,langBarrier:0,avgPreview:"00:55",avgConv:"00:07",enrolled:0},
      {name:"Abigal Duodom",calls:312,noAns:249,voicemail:23,wrong:28,notInterested:5,dnc:3,callback:0,expired:0,finishedSystem:4,moving:0,langBarrier:0,avgPreview:"01:06",avgConv:"00:03",enrolled:0},
      {name:"Frances Obaze",calls:382,noAns:269,voicemail:67,wrong:5,notInterested:7,dnc:1,callback:0,expired:32,finishedSystem:0,moving:0,langBarrier:1,avgPreview:"00:51",avgConv:"00:09",enrolled:0},
      {name:"Nick Baffour",calls:302,noAns:237,voicemail:29,wrong:25,notInterested:3,dnc:1,callback:1,expired:0,finishedSystem:5,moving:0,langBarrier:0,avgPreview:"01:20",avgConv:"00:04",enrolled:0},
      {name:"Prince Selasie",calls:423,noAns:413,voicemail:0,wrong:2,notInterested:3,dnc:0,callback:0,expired:0,finishedSystem:5,moving:0,langBarrier:0,avgPreview:"00:58",avgConv:"00:06",enrolled:0},
    ]
  },
  {
    date:"2026-05-20",partial:false,agents:5,
    dispositions:{noAns:1266,voicemail:169,wrong:95,notInterested:15,dnc:9,callback:1,expired:17,finishedSystem:22,moving:0,langBarrier:0},
    timing:{previewAT:"01:03",convAT:"00:05"},
        enrolled:0,
    agentData:[
      {name:"Anna Amponsah",calls:383,noAns:245,voicemail:89,wrong:39,notInterested:6,dnc:0,callback:1,expired:0,finishedSystem:3,moving:0,langBarrier:0,avgPreview:"00:55",avgConv:"00:07",enrolled:0},
      {name:"Abigal Duodom",calls:341,noAns:288,voicemail:19,wrong:24,notInterested:2,dnc:3,callback:0,expired:0,finishedSystem:5,moving:0,langBarrier:0,avgPreview:"00:47",avgConv:"00:03",enrolled:0},
      {name:"Frances Obaze",calls:227,noAns:161,voicemail:41,wrong:3,notInterested:1,dnc:3,callback:0,expired:17,finishedSystem:1,moving:0,langBarrier:0,avgPreview:"01:09",avgConv:"00:07",enrolled:0},
      {name:"Nick Baffour",calls:306,noAns:243,voicemail:20,wrong:28,notInterested:3,dnc:2,callback:0,expired:0,finishedSystem:10,moving:0,langBarrier:0,avgPreview:"01:12",avgConv:"00:03",enrolled:0},
      {name:"Prince Selasie",calls:337,noAns:329,voicemail:0,wrong:1,notInterested:3,dnc:1,callback:0,expired:0,finishedSystem:3,moving:0,langBarrier:0,avgPreview:"01:12",avgConv:"00:06",enrolled:0},
    ]
  },
  {
    date:"2026-05-21",partial:false,agents:5,
    dispositions:{noAns:1116,voicemail:408,wrong:91,notInterested:66,dnc:8,callback:3,expired:32,finishedSystem:14,moving:0,langBarrier:3},
    timing:{previewAT:"01:03",convAT:"00:10"},
        enrolled:0,
    agentData:[
      {name:"Anna Amponsah",calls:321,noAns:138,voicemail:131,wrong:30,notInterested:21,dnc:1,callback:0,expired:0,finishedSystem:0,moving:0,langBarrier:0,avgPreview:"01:08",avgConv:"00:13",enrolled:0},
      {name:"Abigal Duodom",calls:370,noAns:223,voicemail:92,wrong:29,notInterested:20,dnc:1,callback:2,expired:0,finishedSystem:2,moving:0,langBarrier:1,avgPreview:"00:59",avgConv:"00:09",enrolled:0},
      {name:"Frances Obaze",calls:400,noAns:230,voicemail:115,wrong:5,notInterested:8,dnc:6,callback:0,expired:31,finishedSystem:4,moving:0,langBarrier:1,avgPreview:"00:44",avgConv:"00:09",enrolled:0},
      {name:"Nick Baffour",calls:302,noAns:190,voicemail:70,wrong:24,notInterested:10,dnc:0,callback:1,expired:1,finishedSystem:5,moving:0,langBarrier:1,avgPreview:"01:13",avgConv:"00:05",enrolled:0},
      {name:"Prince Selasie",calls:348,noAns:335,voicemail:0,wrong:3,notInterested:7,dnc:0,callback:0,expired:0,finishedSystem:3,moving:0,langBarrier:0,avgPreview:"01:11",avgConv:"00:14",enrolled:0},
    ]
  },
  {
    date:"2026-05-22",partial:false,agents:5,
    dispositions:{noAns:762,voicemail:594,wrong:116,notInterested:79,dnc:16,callback:6,expired:32,finishedSystem:16,moving:1,langBarrier:4},
    timing:{previewAT:"01:08",convAT:"00:15"},
        enrolled:1,
    agentData:[
      {name:"Anna Amponsah",calls:356,noAns:56,voicemail:224,wrong:49,notInterested:20,dnc:3,callback:0,expired:0,finishedSystem:2,moving:1,langBarrier:1,avgPreview:"01:05",avgConv:"00:20",enrolled:0},
      {name:"Abigal Duodom",calls:301,noAns:143,voicemail:96,wrong:32,notInterested:25,dnc:1,callback:0,expired:0,finishedSystem:2,moving:0,langBarrier:1,avgPreview:"01:10",avgConv:"00:13",enrolled:1},
      {name:"Frances Obaze",calls:358,noAns:136,voicemail:163,wrong:3,notInterested:13,dnc:7,callback:2,expired:32,finishedSystem:1,moving:0,langBarrier:0,avgPreview:"00:51",avgConv:"00:17",enrolled:0},
      {name:"Nick Baffour",calls:300,noAns:129,voicemail:111,wrong:30,notInterested:13,dnc:4,callback:2,expired:0,finishedSystem:9,moving:0,langBarrier:2,avgPreview:"01:12",avgConv:"00:08",enrolled:0},
      {name:"Prince Selasie",calls:314,noAns:298,voicemail:0,wrong:2,notInterested:8,dnc:1,callback:2,expired:0,finishedSystem:2,moving:0,langBarrier:0,avgPreview:"01:20",avgConv:"00:16",enrolled:1},
    ]
  },
  {
    date:"2026-05-23",partial:false,agents:5,
    dispositions:{noAns:801,voicemail:469,wrong:99,notInterested:68,dnc:10,callback:4,expired:29,finishedSystem:5,moving:0,langBarrier:7},
    timing:{previewAT:"00:53",convAT:"00:10"},
        enrolled:0,
    agentData:[
      {name:"Anna Amponsah",calls:252,noAns:61,voicemail:142,wrong:33,notInterested:13,dnc:0,callback:0,expired:0,finishedSystem:0,moving:0,langBarrier:3,avgPreview:"00:48",avgConv:"00:14",enrolled:0},
      {name:"Abigal Duodom",calls:331,noAns:182,voicemail:86,wrong:36,notInterested:21,dnc:1,callback:2,expired:0,finishedSystem:2,moving:0,langBarrier:1,avgPreview:"00:55",avgConv:"00:06",enrolled:0},
      {name:"Frances Obaze",calls:263,noAns:59,voicemail:146,wrong:0,notInterested:18,dnc:8,callback:1,expired:29,finishedSystem:0,moving:0,langBarrier:2,avgPreview:"00:29",avgConv:"00:08",enrolled:0},
      {name:"Nick Baffour",calls:300,noAns:159,voicemail:95,wrong:28,notInterested:14,dnc:1,callback:1,expired:0,finishedSystem:2,moving:0,langBarrier:0,avgPreview:"01:17",avgConv:"00:07",enrolled:0},
      {name:"Prince Selasie",calls:346,noAns:340,voicemail:0,wrong:2,notInterested:2,dnc:0,callback:0,expired:0,finishedSystem:1,moving:0,langBarrier:1,avgPreview:"01:09",avgConv:"00:16",enrolled:0},
    ]
  },
  {
    date:"2026-05-25",partial:false,agents:5,
    dispositions:{noAns:803,voicemail:535,wrong:126,notInterested:63,dnc:14,callback:3,expired:24,finishedSystem:7,moving:0,langBarrier:2},
    timing:{previewAT:"00:55",convAT:"00:12"},
        enrolled:0,
    agentData:[
      {name:"Anna Amponsah",calls:303,noAns:57,voicemail:172,wrong:55,notInterested:14,dnc:2,callback:0,expired:0,finishedSystem:1,moving:0,langBarrier:2,avgPreview:"00:47",avgConv:"00:12",enrolled:0},
      {name:"Abigal Duodom",calls:360,noAns:184,voicemail:119,wrong:28,notInterested:24,dnc:2,callback:1,expired:0,finishedSystem:2,moving:0,langBarrier:0,avgPreview:"00:44",avgConv:"00:10",enrolled:0},
      {name:"Frances Obaze",calls:309,noAns:114,voicemail:149,wrong:2,notInterested:8,dnc:9,callback:1,expired:24,finishedSystem:1,moving:0,langBarrier:0,avgPreview:"00:48",avgConv:"00:13",enrolled:0},
      {name:"Nick Baffour",calls:302,noAns:150,voicemail:95,wrong:41,notInterested:13,dnc:1,callback:0,expired:0,finishedSystem:2,moving:0,langBarrier:0,avgPreview:"01:10",avgConv:"00:07",enrolled:0},
      {name:"Prince Selasie",calls:304,noAns:298,voicemail:0,wrong:0,notInterested:4,dnc:0,callback:1,expired:0,finishedSystem:1,moving:0,langBarrier:0,avgPreview:"01:17",avgConv:"00:16",enrolled:0},
    ]
  },
];

// ─── Utils ──────────────────────────────────────────────────────────────────
const tc = d => Object.values(d.dispositions).reduce((a,b)=>a+b,0);
const lc = d => d.dispositions.notInterested+d.dispositions.callback+d.dispositions.moving+d.dispositions.langBarrier;
const cr = d => { const t=tc(d); return t>0?((lc(d)/t)*100).toFixed(1):"0.0"; };
const aLive = a => (a.notInterested||0)+(a.callback||0)+(a.moving||0)+(a.langBarrier||0);
const aCr = a => a.calls>0?((aLive(a)/a.calls)*100).toFixed(1):"0.0";
const pch = (a,b) => { if(a===0) return b===0?"—":"+∞"; const v=((b-a)/a)*100; return (v>=0?"+":"")+v.toFixed(1)+"%"; };
const MONTHS=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const fd = s => { const p=s.split("-"); return parseInt(p[2])+" "+MONTHS[parseInt(p[1])-1]; };
const fn = n => n!=null?n.toLocaleString():"—";
const wk = s => { const d=new Date(s+"T12:00:00"); const day=d.getDay(); const m=new Date(d); m.setDate(d.getDate()-((day+6)%7)); return m.toISOString().slice(0,10); };
const mo = s => s.slice(0,7);

// ─── Palette ────────────────────────────────────────────────────────────────
const C = {
  bg:"#F7F9FC", card:"#FFFFFF", blue:"#3B7DDD", blueLight:"#EBF2FF", blueDark:"#1B3A6B",
  green:"#2ECDA7", greenLight:"#E6FAF4", red:"#F2636F", redLight:"#FFF0F1",
  amber:"#F5A623", amberLight:"#FFF8EB", gray:"#8896AB", grayLight:"#E8ECF1",
  text:"#1A2332", textSec:"#6B7A90", textMuted:"#A3B1C4",
};
const font = "'Outfit', sans-serif";
const LOGO_B64 = "data:image/jpeg;base64,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";

// ─── CSV Parser ──────────────────────────────────────────────────────────────
function parseCSV(text) {
  const rows = text.trim().split("\n").map(r => r.split(",").map(c => c.trim().replace(/^"|"$/g,"")));
  const headers = rows[0];
  return rows.slice(1).map(r => Object.fromEntries(headers.map((h,i) => [h, r[i]||""])));
}

// ─── Charts ──────────────────────────────────────────────────────────────────
function BarChart({data,labels,color=C.blue,height=150,partials}) {
  if(!data||!data.length) return null;
  const max=Math.max(...data.filter(v=>v!=null),1)*1.12;
  const w=560,pad=44,cw=w-pad*2,bw=cw/data.length;
  return (
    <svg viewBox={`0 0 ${w} ${height+28}`} style={{width:"100%",height:"auto"}}>
      {[0,1,2,3,4].map(i=>{const y=8+(height-16)-(i*(height-16)/4);const v=Math.round(max/4*i);
        return <g key={i}><line x1={pad} y1={y} x2={w-16} y2={y} stroke={C.grayLight} strokeWidth=".5"/><text x={pad-5} y={y+3} textAnchor="end" fontSize="8.5" fill={C.textMuted} fontFamily={font}>{fn(v)}</text></g>})}
      {data.map((v,i)=>{if(v==null) return null;const bh=(v/max)*(height-16),x=pad+i*bw+(bw-bw*.55)/2,y=8+(height-16)-bh;const p=partials&&partials[i];
        return <g key={i}><rect x={x} y={y} width={bw*.55} height={bh} rx="4" fill={p?color+"70":color}/>{p&&<text x={x+bw*.275} y={y-3} textAnchor="middle" fontSize="7" fill={C.amber} fontFamily={font}>partial</text>}<text x={pad+i*bw+bw/2} y={height+18} textAnchor="middle" fontSize="8" fill={C.textMuted} fontFamily={font}>{labels[i]}</text></g>})}
    </svg>);
}

function LineChart({data,labels,color=C.green,height=130,unit="",partials,bench,benchLabel}) {
  if(!data||!data.length) return null;
  const filt=data.filter(v=>v!=null);if(!filt.length) return null;
  const max=Math.max(...filt,bench||0,1)*1.2;
  const w=560,pad=44,cw=w-pad*2;
  const pts=data.map((v,i)=>v!=null?{x:pad+(data.length>1?i*cw/(data.length-1):cw/2),y:8+(height-16)-(v/max)*(height-16)}:null);
  const path=pts.filter(Boolean).map((p,i)=>`${i===0?"M":"L"} ${p.x} ${p.y}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${height+28}`} style={{width:"100%",height:"auto"}}>
      {bench!=null&&<><line x1={pad} y1={8+(height-16)-(bench/max)*(height-16)} x2={w-16} y2={8+(height-16)-(bench/max)*(height-16)} stroke={C.amber} strokeWidth="1.2" strokeDasharray="5 3"/>{benchLabel&&<text x={w-14} y={8+(height-16)-(bench/max)*(height-16)-3} fontSize="7.5" fill={C.amber} fontFamily={font}>{benchLabel}</text>}</>}
      <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {data.map((v,i)=>{if(v==null||!pts[i]) return null;const p=partials&&partials[i];
        return <g key={i}><circle cx={pts[i].x} cy={pts[i].y} r="4" fill={C.card} stroke={p?C.amber:color} strokeWidth="2"/><text x={pts[i].x} y={pts[i].y-10} textAnchor="middle" fontSize="9" fontWeight="500" fill={p?C.amber:C.text} fontFamily={font}>{v}{unit}</text><text x={pts[i].x} y={height+18} textAnchor="middle" fontSize="8" fill={C.textMuted} fontFamily={font}>{labels[i]}</text></g>})}
    </svg>);
}

// ─── Components ──────────────────────────────────────────────────────────────
const Stat = ({label,value,sub,accent,bg}) => (
  <div style={{background:bg||C.card,borderRadius:14,padding:"16px 18px",boxShadow:"0 1px 4px rgba(26,35,50,.04)",border:`1px solid ${C.grayLight}`,minWidth:0}}>
    <div style={{fontSize:10.5,fontWeight:600,color:C.textMuted,textTransform:"uppercase",letterSpacing:".05em",marginBottom:4}}>{label}</div>
    <div style={{fontSize:22,fontWeight:700,color:accent||C.text,lineHeight:1.15}}>{value}</div>
    {sub&&<div style={{fontSize:11,color:C.textSec,marginTop:3}}>{sub}</div>}
  </div>
);

const TH = ({children,left}) => <th style={{textAlign:left?"left":"center",padding:"10px 7px",fontSize:10.5,fontWeight:600,color:C.textMuted,textTransform:"uppercase",letterSpacing:".04em",borderBottom:`2px solid ${C.grayLight}`,whiteSpace:"nowrap"}}>{children}</th>;
const TD = ({children,bold,accent,center=true}) => <td style={{textAlign:center?"center":"left",padding:"10px 7px",fontSize:12,fontWeight:bold?600:400,color:accent||C.text}}>{children}</td>;

// ─── Main App ────────────────────────────────────────────────────────────────
export default function App() {
  const [data, setData] = useState(SEED);
  const [loading, setLoading] = useState(false);
  const [sheetsConnected, setSheetsConnected] = useState(false);
  const [view, setView] = useState("campaign");
  const [filter, setFilter] = useState("all");
  const [selDay, setSelDay] = useState("");
  const [selWeek, setSelWeek] = useState("");
  const [selMonth, setSelMonth] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selAgent, setSelAgent] = useState("all");
  const [lbMetric, setLbMetric] = useState("calls");
  const [lbFrom, setLbFrom] = useState("");
  const [lbTo, setLbTo] = useState("");
  const [drillAgent, setDrillAgent] = useState(null);

  // Try to load from Google Sheets
  useEffect(() => {
    // Sheets URLs are configured
    setLoading(true);
    Promise.all([
      fetch(DIALLER_URL).then(r=>r.text()),
      fetch(SALES_URL).then(r=>r.text()),
      fetch(AGENT_URL).then(r=>r.text()),
    ]).then(([diallerCSV, salesCSV, agentCSV]) => {
      const diallerRows = parseCSV(diallerCSV);
      const salesRows = parseCSV(salesCSV);
      const agentRows = parseCSV(agentCSV);
      const salesMap = {};
      salesRows.forEach(r => { salesMap[r.date] = parseInt(r.enrolled)||0; });
      const agentMap = {};
      agentRows.forEach(r => {
        if (!agentMap[r.date]) agentMap[r.date] = [];
        agentMap[r.date].push({
          name:r.name, calls:parseInt(r.calls)||0, noAns:parseInt(r.noAns)||0,
          voicemail:parseInt(r.voicemail)||0, wrong:parseInt(r.wrong)||0,
          notInterested:parseInt(r.notInterested)||0, dnc:parseInt(r.dnc)||0,
          callback:parseInt(r.callback)||0, expired:parseInt(r.expired)||0,
          finishedSystem:parseInt(r.finishedSystem)||0, moving:parseInt(r.moving)||0,
          langBarrier:parseInt(r.langBarrier)||0, avgPreview:r.avgPreview||null,
          avgConv:r.avgConv||null, enrolled:parseInt(r.enrolled)||0,
        });
      });
      const newData = diallerRows.map(r => ({
        date:r.date, partial:r.partial==="true", agents:parseInt(r.agents)||0,
        dispositions:{noAns:parseInt(r.noAns)||0, voicemail:parseInt(r.voicemail)||0,
          wrong:parseInt(r.wrong)||0, notInterested:parseInt(r.notInterested)||0,
          dnc:parseInt(r.dnc)||0, callback:parseInt(r.callback)||0,
          expired:parseInt(r.expired)||0, finishedSystem:parseInt(r.finishedSystem)||0,
          moving:parseInt(r.moving)||0, langBarrier:parseInt(r.langBarrier)||0},
        timing:{previewAT:r.previewAT||null, convAT:r.convAT||null},
        enrolled:salesMap[r.date]||0,
        agentData:agentMap[r.date]||[],
      }));
      if(newData.length > 0) { setData(newData); setSheetsConnected(true); }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const weeks = useMemo(()=>[...new Set(data.map(d=>wk(d.date)))],[data]);
  const months = useMemo(()=>[...new Set(data.map(d=>mo(d.date)))],[data]);
  const allAgents = useMemo(()=>{const s=new Set();data.forEach(d=>d.agentData.forEach(a=>s.add(a.name)));return [...s].sort();},[data]);

  const filtered = useMemo(()=>{
    if(filter==="day"&&selDay) return data.filter(d=>d.date===selDay);
    if(filter==="week"&&selWeek) return data.filter(d=>wk(d.date)===selWeek);
    if(filter==="month"&&selMonth) return data.filter(d=>mo(d.date)===selMonth);
    return data;
  },[data,filter,selDay,selWeek,selMonth]);

  const agentFiltered = useMemo(()=>{
    let d=data.filter(x=>x.agentData.length>0);
    if(dateFrom) d=d.filter(x=>x.date>=dateFrom);
    if(dateTo) d=d.filter(x=>x.date<=dateTo);
    return d;
  },[data,dateFrom,dateTo]);

  const aggAgents = useMemo(()=>{
    const map={};
    agentFiltered.forEach(day=>{
      day.agentData.forEach(a=>{
        if(!map[a.name]) map[a.name]={name:a.name,calls:0,noAns:0,voicemail:0,wrong:0,notInterested:0,dnc:0,callback:0,expired:0,finishedSystem:0,moving:0,langBarrier:0,enrolled:0,days:0};
        const m=map[a.name];
        ["calls","noAns","voicemail","wrong","notInterested","dnc","callback","expired","finishedSystem","moving","langBarrier","enrolled"].forEach(k=>{m[k]+=(a[k]||0);});
        m.days++;
      });
    });
    return Object.values(map);
  },[agentFiltered]);

  const lbFiltered = useMemo(()=>{
    let d=data.filter(x=>x.agentData.length>0);
    if(lbFrom) d=d.filter(x=>x.date>=lbFrom);
    if(lbTo) d=d.filter(x=>x.date<=lbTo);
    return d;
  },[data,lbFrom,lbTo]);

  const lbAgents = useMemo(()=>{
    const map={};
    lbFiltered.forEach(day=>{
      day.agentData.forEach(a=>{
        if(!map[a.name]) map[a.name]={name:a.name,calls:0,enrolled:0,days:0,live:0};
        map[a.name].calls+=(a.calls||0);
        map[a.name].enrolled+=(a.enrolled||0);
        map[a.name].live+=aLive(a);
        map[a.name].days++;
      });
    });
    return Object.values(map).map(a=>({...a,cr:a.calls>0?((a.live/a.calls)*100).toFixed(1):"0.0"}));
  },[lbFiltered]);

  const leaderboard = useMemo(()=>{
    const key=lbMetric==="calls"?"calls":lbMetric==="live"?"live":lbMetric==="connect"?"cr":"enrolled";
    return [...lbAgents].sort((a,b)=>parseFloat(b[key])-parseFloat(a[key]));
  },[lbAgents,lbMetric]);

  const agg = useMemo(()=>{
    const a={calls:0,live:0,agents:0,noAns:0,voicemail:0,wrong:0,notInterested:0,dnc:0,callback:0,expired:0,finishedSystem:0,moving:0,langBarrier:0,enrolled:0};
    filtered.forEach(d=>{
      a.calls+=tc(d);a.live+=lc(d);a.agents=Math.max(a.agents,d.agents);
      Object.keys(d.dispositions).forEach(k=>{a[k]+=d.dispositions[k];});
      a.enrolled+=(d.enrolled||0);
    });
    return a;
  },[filtered]);

  const drillData = useMemo(()=>{
    if(!drillAgent) return [];
    return data.filter(d=>d.agentData.length>0).map(d=>{
      const a=d.agentData.find(x=>x.name===drillAgent);
      if(!a) return null;
      return {date:d.date,partial:d.partial,...a};
    }).filter(Boolean);
  },[data,drillAgent]);

  const labels=filtered.map(d=>fd(d.date).replace(",",""));
  const partials=filtered.map(d=>d.partial);

  // ─── Styles ───────────────────────────────────────────────────────────────
  const tab=(a)=>({padding:"8px 22px",borderRadius:10,border:"none",background:a?C.blue:"transparent",color:a?"#fff":C.textSec,fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:font,transition:"all .15s"});
  const fbtn=(a)=>({padding:"6px 15px",borderRadius:9,border:a?`1.5px solid ${C.blue}`:`1.5px solid ${C.grayLight}`,background:a?C.blueLight:C.card,color:a?C.blue:C.textSec,fontWeight:500,fontSize:11.5,cursor:"pointer",fontFamily:font});
  const sel={padding:"6px 10px",borderRadius:9,border:`1.5px solid ${C.grayLight}`,background:C.card,color:C.text,fontSize:12,fontFamily:font,outline:"none"};
  const cc={background:C.card,borderRadius:14,padding:"18px 20px",boxShadow:"0 1px 4px rgba(26,35,50,.04)",border:`1px solid ${C.grayLight}`};
  const ct={margin:"0 0 8px",fontSize:11,fontWeight:600,color:C.textMuted,textTransform:"uppercase",letterSpacing:".04em"};

  // ─── Agent Drill-down ─────────────────────────────────────────────────────
  if(drillAgent) {
    return (
      <div style={{fontFamily:font,background:C.bg,minHeight:"100vh",padding:"24px"}}>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet"/>
        <button onClick={()=>setDrillAgent(null)} style={{background:"none",border:"none",color:C.blue,fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:font,marginBottom:16,padding:0}}>← Back to Leaderboard</button>
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:24}}>
          <img src={LOGO_B64} alt="Appoynt" style={{height:36,borderRadius:6}}/>
          <div>
            <h1 style={{margin:0,fontSize:20,fontWeight:700,color:C.text}}>{drillAgent}</h1>
            <p style={{margin:0,fontSize:12,color:C.textSec}}>Agent Performance Profile · Provision Campaign (Ohio)</p>
          </div>
        </div>
        {drillData.length===0
          ? <div style={{...cc,padding:48,textAlign:"center",color:C.textMuted}}>No per-agent data available.</div>
          : <>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:12,marginBottom:20}}>
              {(()=>{
                const tot={calls:0,live:0,wrong:0,enrolled:0};
                drillData.forEach(d=>{tot.calls+=d.calls;tot.live+=aLive(d);tot.wrong+=d.wrong;tot.enrolled+=(d.enrolled||0);});
                const crV=tot.calls>0?((tot.live/tot.calls)*100).toFixed(1):"0.0";
                return <>
                  <Stat label="Total Calls" value={fn(tot.calls)} sub={`${drillData.length} days`}/>
                  <Stat label="Live Contacts" value={fn(tot.live)} sub={`${crV}% connect`}/>
                  <Stat label="Wrong Numbers" value={fn(tot.wrong)} accent={C.red}/>
                  <Stat label="Enrolled" value={fn(tot.enrolled)}/>
                </>;
              })()}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20}}>
              <div style={cc}><p style={ct}>Daily Calls</p><BarChart data={drillData.map(d=>d.calls)} labels={drillData.map(d=>fd(d.date).replace(",",""))} color={C.blue} partials={drillData.map(d=>d.partial)}/></div>
              <div style={cc}><p style={ct}>Connect Rate %</p><LineChart data={drillData.map(d=>parseFloat(aCr(d)))} labels={drillData.map(d=>fd(d.date).replace(",",""))} color={C.green} unit="%" partials={drillData.map(d=>d.partial)}/></div>
              <div style={cc}><p style={ct}>Wrong Number Rate %</p><LineChart data={drillData.map(d=>d.calls>0?parseFloat(((d.wrong/d.calls)*100).toFixed(1)):null)} labels={drillData.map(d=>fd(d.date).replace(",",""))} color={C.red} unit="%" partials={drillData.map(d=>d.partial)}/></div>
              <div style={cc}><p style={ct}>Preview AT (seconds)</p>
                {drillData.some(d=>d.avgPreview)
                  ? <LineChart data={drillData.map(d=>{if(!d.avgPreview)return null;const[m,s]=d.avgPreview.split(":");return parseInt(m)*60+parseInt(s);})} labels={drillData.map(d=>fd(d.date).replace(",",""))} color={C.amber} unit="s" bench={35} benchLabel="35s target" partials={drillData.map(d=>d.partial)}/>
                  : <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:100,color:C.textMuted,fontSize:12}}>No timing data</div>}
              </div>
            </div>
            <div style={{...cc,overflowX:"auto"}}>
              <p style={ct}>Daily Breakdown</p>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                <thead><tr><TH left>Day</TH><TH>Calls</TH><TH>No Ans</TH><TH>VM</TH><TH>Wrong#</TH><TH>Not Int.</TH><TH>DNC</TH><TH>CB</TH><TH>Live</TH><TH>Conn%</TH><TH>Prev.AT</TH><TH>Conv AT</TH><TH>Enrolled</TH></tr></thead>
                <tbody>{drillData.map((d,i)=>(
                  <tr key={d.date} style={{borderBottom:`1px solid ${C.grayLight}`,background:i%2?C.bg:"transparent"}}>
                    <TD center={false} bold>{fd(d.date)}{d.partial?<span style={{color:C.amber,marginLeft:4,fontSize:9}}>●</span>:""}</TD>
                    <TD bold>{d.calls}</TD><TD>{d.noAns}</TD><TD>{d.voicemail}</TD>
                    <TD accent={d.calls>0&&d.wrong/d.calls>.1?C.red:null}>{d.wrong}</TD>
                    <TD>{d.notInterested}</TD><TD>{d.dnc}</TD><TD>{d.callback}</TD>
                    <TD bold accent={C.blue}>{aLive(d)}</TD><TD bold accent={C.green}>{aCr(d)}%</TD>
                    <TD>{d.avgPreview||"—"}</TD><TD>{d.avgConv||"—"}</TD><TD>{d.enrolled||0}</TD>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </>}
      </div>
    );
  }

  // ─── Main Dashboard ───────────────────────────────────────────────────────
  return (
    <div style={{fontFamily:font,background:C.bg,minHeight:"100vh",padding:"24px"}}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet"/>

      {/* Header */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:10}}>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <img src={LOGO_B64} alt="Appoynt" style={{height:40,borderRadius:8}}/>
          <div>
            <h1 style={{margin:0,fontSize:20,fontWeight:700,color:C.text}}>Provision Campaign</h1>
            <p style={{margin:0,fontSize:12,color:C.textSec}}>Ohio Outbound Sales Dashboard</p>
          </div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          {loading && <span style={{fontSize:11,color:C.textMuted}}>Loading...</span>}
          {sheetsConnected && <span style={{fontSize:11,color:C.green,fontWeight:500}}>● Live from Sheets</span>}
          {!sheetsConnected && !loading && <span style={{fontSize:11,color:C.amber,fontWeight:500}}>● Seed data</span>}
        </div>
      </div>

      {/* Tabs */}
      <div style={{display:"flex",gap:5,marginBottom:18,background:C.card,borderRadius:12,padding:4,width:"fit-content",boxShadow:"0 1px 3px rgba(0,0,0,.04)",border:`1px solid ${C.grayLight}`}}>
        {[["campaign","Campaign"],["agent","Agents"],["leaderboard","Leaderboard"]].map(([k,l])=>(
          <button key={k} style={tab(view===k)} onClick={()=>setView(k)}>{l}</button>
        ))}
      </div>

      {/* ══ CAMPAIGN ══ */}
      {view==="campaign" && (
        <div>
          <div style={{display:"flex",gap:7,alignItems:"center",marginBottom:18,flexWrap:"wrap"}}>
            {[["all","All"],["day","Day"],["week","Week"],["month","Month"]].map(([k,l])=>(
              <button key={k} style={fbtn(filter===k)} onClick={()=>setFilter(k)}>{l}</button>
            ))}
            {filter==="day"&&<select style={sel} value={selDay} onChange={e=>setSelDay(e.target.value)}><option value="">Select day</option>{data.map(d=><option key={d.date} value={d.date}>{fd(d.date)}{d.partial?" (partial)":""}</option>)}</select>}
            {filter==="week"&&<select style={sel} value={selWeek} onChange={e=>setSelWeek(e.target.value)}><option value="">Select week</option>{weeks.map(w=><option key={w} value={w}>Week of {fd(w)}</option>)}</select>}
            {filter==="month"&&<select style={sel} value={selMonth} onChange={e=>setSelMonth(e.target.value)}><option value="">Select month</option>{months.map(m=><option key={m} value={m}>{new Date(m+"-15").toLocaleDateString("en-GB",{month:"long",year:"numeric"})}</option>)}</select>}
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(145px,1fr))",gap:12,marginBottom:22}}>
            <Stat label="Total Calls" value={fn(agg.calls)} sub={`${filtered.length} day${filtered.length!==1?"s":""}`}/>
            <Stat label="Live Contacts" value={fn(agg.live)} sub={agg.calls>0?`${((agg.live/agg.calls)*100).toFixed(1)}% connect rate`:"—"}/>
            <Stat label="No Answer" value={fn(agg.noAns)} sub={agg.calls>0?`${((agg.noAns/agg.calls)*100).toFixed(1)}% of calls`:""} accent={C.amber} bg={C.amberLight}/>
            <Stat label="Voicemail" value={fn(agg.voicemail)} sub={agg.calls>0?`${((agg.voicemail/agg.calls)*100).toFixed(1)}% of calls`:""}/>
            <Stat label="Wrong Numbers" value={fn(agg.wrong)} sub={agg.calls>0?`${((agg.wrong/agg.calls)*100).toFixed(1)}% of calls`:""} accent={C.red} bg={C.redLight}/>
            <Stat label="DNC" value={fn(agg.dnc)} sub={agg.calls>0?`${((agg.dnc/agg.calls)*100).toFixed(1)}% of calls`:""} accent={C.red}/>
            <Stat label="Enrolled" value={fn(agg.enrolled)} sub="total enrolments"/>
            <Stat label="Agents" value={agg.agents}/>
          </div>

          {filtered.length>1&&(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:22}}>
              <div style={cc}><p style={ct}>Daily Call Volume</p><BarChart data={filtered.map(tc)} labels={labels} color={C.blue} partials={partials}/></div>
              <div style={cc}><p style={ct}>Live Connect Rate %</p><LineChart data={filtered.map(d=>parseFloat(cr(d)))} labels={labels} color={C.green} unit="%" partials={partials}/></div>
              <div style={cc}><p style={ct}>Wrong Number Rate %</p><LineChart data={filtered.map(d=>{const t=tc(d);return t>0?parseFloat(((d.dispositions.wrong/t)*100).toFixed(1)):null;})} labels={labels} color={C.red} unit="%" partials={partials}/></div>
              <div style={cc}><p style={ct}>Preview AT Trend (seconds)</p><LineChart data={filtered.map(d=>{if(!d.timing.previewAT)return null;const[m,s]=d.timing.previewAT.split(":");return parseInt(m)*60+parseInt(s);})} labels={labels} color={C.amber} unit="s" bench={35} benchLabel="35s target" partials={partials}/></div>
            </div>
          )}

          <div style={{...cc,overflowX:"auto"}}>
            <p style={ct}>Disposition Breakdown</p>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
              <thead><tr><TH left>Day</TH><TH>Total</TH><TH>No Ans</TH><TH>VM</TH><TH>Wrong#</TH><TH>Not Int.</TH><TH>DNC</TH><TH>CB</TH><TH>Expired</TH><TH>Fin.Sys</TH><TH>Moving</TH><TH>Lang</TH><TH>Live</TH><TH>Conn%</TH><TH>Enrolled</TH></tr></thead>
              <tbody>{filtered.map((d,i)=>{
                const t=tc(d),l=lc(d),prev=i>0?filtered[i-1]:null;
                return (
                  <tr key={d.date} style={{borderBottom:`1px solid ${C.grayLight}`,background:i%2?C.bg:"transparent"}}>
                    <td style={{textAlign:"left",padding:"10px 7px",fontWeight:500,color:C.text,whiteSpace:"nowrap"}}>{fd(d.date)}{d.partial?<span style={{color:C.amber,marginLeft:4,fontSize:9}}>●</span>:""}</td>
                    <TD bold>{fn(t)}</TD>
                    {["noAns","voicemail","wrong","notInterested","dnc","callback","expired","finishedSystem","moving","langBarrier"].map(k=>{
                      const v=d.dispositions[k],pv=prev?prev.dispositions[k]:null;
                      const ch=pv!=null?pch(pv,v):"";
                      const isWrong=k==="wrong";
                      return <TD key={k}><div>{fn(v)}</div>{ch&&<div style={{fontSize:8.5,color:isWrong?(ch.startsWith("+")?C.red:C.green):C.textMuted,marginTop:1}}>{ch}</div>}</TD>;
                    })}
                    <TD bold accent={C.blue}>{l}</TD><TD bold accent={C.green}>{cr(d)}%</TD><TD>{d.enrolled||0}</TD>
                  </tr>);
              })}</tbody>
            </table>
          </div>
        </div>
      )}

      {/* ══ AGENTS ══ */}
      {view==="agent" && (
        <div>
          <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:18,flexWrap:"wrap"}}>
            <span style={{fontSize:11,color:C.textSec,fontWeight:500}}>From</span>
            <select style={sel} value={dateFrom} onChange={e=>setDateFrom(e.target.value)}>
              <option value="">Earliest</option>
              {data.filter(d=>d.agentData.length).map(d=><option key={d.date} value={d.date}>{fd(d.date)}</option>)}
            </select>
            <span style={{fontSize:11,color:C.textSec,fontWeight:500}}>To</span>
            <select style={sel} value={dateTo} onChange={e=>setDateTo(e.target.value)}>
              <option value="">Latest</option>
              {data.filter(d=>d.agentData.length).map(d=><option key={d.date} value={d.date}>{fd(d.date)}</option>)}
            </select>
            <span style={{fontSize:11,color:C.textSec,fontWeight:500,marginLeft:8}}>Agent</span>
            <select style={sel} value={selAgent} onChange={e=>setSelAgent(e.target.value)}>
              <option value="all">All Agents</option>
              {allAgents.map(a=><option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          {aggAgents.length===0
            ? <div style={{...cc,padding:48,textAlign:"center",color:C.textMuted}}>No per-agent data in selected range.</div>
            : <>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12,marginBottom:20}}>
                {(selAgent==="all"?aggAgents:aggAgents.filter(a=>a.name===selAgent)).map(a=>{
                  const live=aLive(a),crV=aCr(a);
                  return (
                    <div key={a.name} style={{...cc,padding:"16px 18px"}}>
                      <p style={{margin:"0 0 10px",fontSize:13,fontWeight:600,color:C.text}}>{a.name}</p>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                        <div><span style={{fontSize:10,color:C.textMuted,display:"block"}}>Calls</span><span style={{fontSize:18,fontWeight:700,color:C.text}}>{fn(a.calls)}</span></div>
                        <div><span style={{fontSize:10,color:C.textMuted,display:"block"}}>Live</span><span style={{fontSize:18,fontWeight:700,color:C.blue}}>{live}</span></div>
                        <div><span style={{fontSize:10,color:C.textMuted,display:"block"}}>Connect</span><span style={{fontSize:14,fontWeight:600,color:C.green}}>{crV}%</span></div>
                        <div><span style={{fontSize:10,color:C.textMuted,display:"block"}}>Enrolled</span><span style={{fontSize:14,fontWeight:600,color:C.text}}>{a.enrolled}</span></div>
                      </div>
                    </div>);
                })}
              </div>
              <div style={{...cc,overflowX:"auto"}}>
                <p style={ct}>Agent Detail{selAgent!=="all"?` — ${selAgent}`:""}</p>
                <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                  <thead><tr><TH left>Agent</TH><TH>Calls</TH><TH>No Ans</TH><TH>VM</TH><TH>Wrong#</TH><TH>Not Int.</TH><TH>DNC</TH><TH>CB</TH><TH>Expired</TH><TH>Fin.Sys</TH><TH>Live</TH><TH>Conn%</TH><TH>Enrolled</TH></tr></thead>
                  <tbody>{(selAgent==="all"?aggAgents:aggAgents.filter(a=>a.name===selAgent)).map((a,i)=>{
                    const live=aLive(a),crV=aCr(a);
                    return (
                      <tr key={a.name} style={{borderBottom:`1px solid ${C.grayLight}`,background:i%2?C.bg:"transparent"}}>
                        <td style={{textAlign:"left",padding:"10px 7px",fontWeight:500,color:C.text,whiteSpace:"nowrap"}}>{a.name}</td>
                        <TD bold>{fn(a.calls)}</TD><TD>{fn(a.noAns)}</TD><TD>{fn(a.voicemail)}</TD>
                        <TD accent={a.calls>0&&a.wrong/a.calls>.1?C.red:null}>{fn(a.wrong)}</TD>
                        <TD>{fn(a.notInterested)}</TD><TD>{fn(a.dnc)}</TD><TD>{fn(a.callback)}</TD>
                        <TD>{fn(a.expired)}</TD><TD>{fn(a.finishedSystem)}</TD>
                        <TD bold accent={C.blue}>{live}</TD><TD bold accent={C.green}>{crV}%</TD>
                        <TD bold>{fn(a.enrolled)}</TD>
                      </tr>);
                  })}</tbody>
                </table>
              </div>
            </>}
        </div>
      )}

      {/* ══ LEADERBOARD ══ */}
      {view==="leaderboard" && (
        <div>
          <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:18,flexWrap:"wrap"}}>
            <span style={{fontSize:11,color:C.textSec,fontWeight:500}}>From</span>
            <select style={sel} value={lbFrom} onChange={e=>setLbFrom(e.target.value)}>
              <option value="">Earliest</option>
              {data.filter(d=>d.agentData.length).map(d=><option key={d.date} value={d.date}>{fd(d.date)}</option>)}
            </select>
            <span style={{fontSize:11,color:C.textSec,fontWeight:500}}>To</span>
            <select style={sel} value={lbTo} onChange={e=>setLbTo(e.target.value)}>
              <option value="">Latest</option>
              {data.filter(d=>d.agentData.length).map(d=><option key={d.date} value={d.date}>{fd(d.date)}</option>)}
            </select>
            <span style={{color:C.textMuted,margin:"0 6px"}}>|</span>
            <span style={{fontSize:11,color:C.textSec,fontWeight:500}}>Rank by</span>
            {[["calls","Calls"],["live","Live Contacts"],["connect","Connect %"],["enrolled","Enrolled"]].map(([k,l])=>(
              <button key={k} style={fbtn(lbMetric===k)} onClick={()=>setLbMetric(k)}>{l}</button>
            ))}
          </div>

          {leaderboard.length===0
            ? <div style={{...cc,padding:48,textAlign:"center",color:C.textMuted}}>No agent data available.</div>
            : <div style={{display:"grid",gap:10}}>
              {leaderboard.map((a,i)=>{
                const medal=i===0?"🥇":i===1?"🥈":i===2?"🥉":"";
                const metricVal=lbMetric==="calls"?fn(a.calls):lbMetric==="live"?fn(a.live):lbMetric==="connect"?a.cr+"%":fn(a.enrolled);
                const barMax=leaderboard[0]?parseFloat(lbMetric==="calls"?leaderboard[0].calls:lbMetric==="live"?leaderboard[0].live:lbMetric==="connect"?leaderboard[0].cr:leaderboard[0].enrolled):1;
                const barVal=parseFloat(lbMetric==="calls"?a.calls:lbMetric==="live"?a.live:lbMetric==="connect"?a.cr:a.enrolled);
                const barPct=barMax>0?(barVal/barMax)*100:0;
                return (
                  <div key={a.name} onClick={()=>setDrillAgent(a.name)}
                    style={{...cc,padding:"14px 20px",cursor:"pointer",display:"flex",alignItems:"center",gap:16,transition:"box-shadow .15s"}}
                    onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 16px rgba(59,125,221,.12)"}
                    onMouseLeave={e=>e.currentTarget.style.boxShadow="0 1px 4px rgba(26,35,50,.04)"}>
                    <div style={{fontSize:20,width:32,textAlign:"center"}}>{medal||<span style={{fontSize:14,fontWeight:600,color:C.textMuted}}>#{i+1}</span>}</div>
                    <div style={{flex:"0 0 150px"}}>
                      <p style={{margin:0,fontSize:14,fontWeight:600,color:C.text}}>{a.name}</p>
                      <p style={{margin:"2px 0 0",fontSize:11,color:C.textSec}}>{fn(a.calls)} calls · {a.cr}% connect</p>
                    </div>
                    <div style={{flex:1,display:"flex",alignItems:"center",gap:12}}>
                      <div style={{flex:1,height:10,background:C.grayLight,borderRadius:6,overflow:"hidden"}}>
                        <div style={{width:`${barPct}%`,height:"100%",background:i===0?C.blue:i===1?C.green:C.amber,borderRadius:6,transition:"width .3s"}}/>
                      </div>
                      <span style={{fontSize:15,fontWeight:700,color:C.text,minWidth:60,textAlign:"right"}}>{metricVal}</span>
                    </div>
                    <span style={{fontSize:11,color:C.blue,fontWeight:500}}>View →</span>
                  </div>);
              })}
            </div>}
        </div>
      )}

      {/* Footer */}
      <div style={{marginTop:32,paddingTop:16,borderTop:`1px solid ${C.grayLight}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
        <span style={{fontSize:10.5,color:C.textMuted}}>Appoynt · Provision Campaign (Ohio) · Last updated: {fd(data[data.length-1].date)}{data[data.length-1].partial?" (partial)":""}</span>
        <span style={{fontSize:10.5,color:C.textMuted}}>Source: NobelBiz dialler · Provision sales reports</span>
      </div>
    </div>
  );
}
