import React, { useState, useMemo } from "react";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";



const SEED = [
  { date:"2026-05-05", partial:false, agents:4, dispositions:{noAns:553,voicemail:197,wrong:13,notInterested:20,dnc:4,callback:2,expired:69,finishedSystem:17,moving:0,langBarrier:0}, timing:{previewAT:null,convAT:null}, enrolled:0, sales:{submitted:0,paid:0,pending:0,utilityDenied:0,qcDenied:0,cancelled:0}, agentData:[] },
  { date:"2026-05-06", partial:false, agents:5, dispositions:{noAns:632,voicemail:254,wrong:100,notInterested:29,dnc:1,callback:2,expired:4,finishedSystem:14,moving:3,langBarrier:1}, timing:{previewAT:null,convAT:null}, enrolled:0, sales:{submitted:0,paid:0,pending:0,utilityDenied:0,qcDenied:0,cancelled:0}, agentData:[] },
  { date:"2026-05-07", partial:false, agents:5, dispositions:{noAns:846,voicemail:221,wrong:176,notInterested:28,dnc:3,callback:0,expired:0,finishedSystem:16,moving:1,langBarrier:0}, timing:{previewAT:null,convAT:null}, enrolled:0, sales:{submitted:0,paid:0,pending:0,utilityDenied:0,qcDenied:0,cancelled:0}, agentData:[] },
  { date:"2026-05-08", partial:false, agents:5, dispositions:{noAns:957,voicemail:210,wrong:126,notInterested:24,dnc:3,callback:1,expired:1,finishedSystem:9,moving:3,langBarrier:0}, timing:{previewAT:"01:27",convAT:"00:06"}, enrolled:0, sales:{submitted:0,paid:0,pending:0,utilityDenied:0,qcDenied:0,cancelled:0}, agentData:[] },
  { date:"2026-05-11", partial:false, agents:5, dispositions:{noAns:905,voicemail:246,wrong:114,notInterested:30,dnc:2,callback:0,expired:0,finishedSystem:13,moving:0,langBarrier:0}, timing:{previewAT:"01:24",convAT:"00:06"}, enrolled:0, sales:{submitted:0,paid:0,pending:0,utilityDenied:0,qcDenied:0,cancelled:0}, agentData:[] },
  { date:"2026-05-12", partial:false, agents:5, dispositions:{noAns:982,voicemail:209,wrong:81,notInterested:31,dnc:5,callback:2,expired:1,finishedSystem:9,moving:0,langBarrier:0}, timing:{previewAT:"01:30",convAT:"00:05"}, enrolled:0, sales:{submitted:0,paid:0,pending:0,utilityDenied:0,qcDenied:0,cancelled:0}, agentData:[] },
  { date:"2026-05-13", partial:false, agents:5, dispositions:{noAns:1042,voicemail:177,wrong:69,notInterested:24,dnc:0,callback:0,expired:0,finishedSystem:15,moving:0,langBarrier:1}, timing:{previewAT:"01:22",convAT:"00:04"}, enrolled:0, sales:{submitted:0,paid:0,pending:0,utilityDenied:0,qcDenied:0,cancelled:0}, agentData:[] },
  { date:"2026-05-14", partial:false, agents:5, dispositions:{noAns:1323,voicemail:270,wrong:132,notInterested:42,dnc:7,callback:3,expired:0,finishedSystem:18,moving:0,langBarrier:0}, timing:{previewAT:"01:06",convAT:"00:06"}, enrolled:0, sales:{submitted:0,paid:0,pending:0,utilityDenied:0,qcDenied:0,cancelled:0}, agentData:[] },
  { date:"2026-05-15", partial:false, agents:5, dispositions:{noAns:1345,voicemail:302,wrong:115,notInterested:33,dnc:10,callback:1,expired:32,finishedSystem:10,moving:0,langBarrier:2}, timing:{previewAT:"01:02",convAT:"00:07"}, enrolled:0, sales:{submitted:0,paid:0,pending:0,utilityDenied:0,qcDenied:0,cancelled:0}, agentData:[] },
  { date:"2026-05-16", partial:false, agents:5, dispositions:{noAns:1177,voicemail:315,wrong:169,notInterested:29,dnc:11,callback:1,expired:37,finishedSystem:16,moving:0,langBarrier:0}, timing:{previewAT:"01:04",convAT:"00:07"}, enrolled:0, sales:{submitted:0,paid:0,pending:0,utilityDenied:0,qcDenied:0,cancelled:0}, agentData:[] },
  { date:"2026-05-18", partial:false, agents:5, dispositions:{noAns:1202,voicemail:293,wrong:111,notInterested:38,dnc:11,callback:2,expired:25,finishedSystem:13,moving:0,langBarrier:1}, timing:{previewAT:"01:04",convAT:"00:08"}, enrolled:0, sales:{submitted:0,paid:0,pending:0,utilityDenied:0,qcDenied:0,cancelled:0}, agentData:[] },
  { date:"2026-05-19", partial:false, agents:5, dispositions:{noAns:1392,voicemail:240,wrong:95,notInterested:26,dnc:5,callback:1,expired:32,finishedSystem:14,moving:0,langBarrier:1}, timing:{previewAT:"01:02",convAT:"00:06"}, enrolled:0, sales:{submitted:0,paid:0,pending:0,utilityDenied:0,qcDenied:0,cancelled:0}, agentData:[] },
  { date:"2026-05-20", partial:false, agents:5, dispositions:{noAns:1266,voicemail:169,wrong:95,notInterested:15,dnc:9,callback:1,expired:17,finishedSystem:22,moving:0,langBarrier:0}, timing:{previewAT:"01:03",convAT:"00:05"}, enrolled:0, sales:{submitted:0,paid:0,pending:0,utilityDenied:0,qcDenied:0,cancelled:0}, agentData:[] },
  { date:"2026-05-21", partial:false, agents:5, dispositions:{noAns:1116,voicemail:408,wrong:91,notInterested:66,dnc:8,callback:3,expired:32,finishedSystem:14,moving:0,langBarrier:3}, timing:{previewAT:"01:03",convAT:"00:10"}, enrolled:0, sales:{submitted:0,paid:0,pending:0,utilityDenied:0,qcDenied:0,cancelled:0}, agentData:[{name:"Anna Amponsah",calls:321,noAns:138,voicemail:131,wrong:30,notInterested:21,dnc:1,callback:0,expired:0,finishedSystem:0,moving:0,langBarrier:0,avgPreview:"01:08",avgConv:"00:13",enrolled:0},{name:"Abigal Duodom",calls:370,noAns:223,voicemail:92,wrong:29,notInterested:20,dnc:1,callback:2,expired:0,finishedSystem:2,moving:0,langBarrier:1,avgPreview:"00:59",avgConv:"00:09",enrolled:0},{name:"Frances Obaze",calls:400,noAns:230,voicemail:115,wrong:5,notInterested:8,dnc:6,callback:0,expired:31,finishedSystem:4,moving:0,langBarrier:1,avgPreview:"00:44",avgConv:"00:09",enrolled:0},{name:"Nick Baffour",calls:302,noAns:190,voicemail:70,wrong:24,notInterested:10,dnc:0,callback:1,expired:1,finishedSystem:5,moving:0,langBarrier:1,avgPreview:"01:13",avgConv:"00:05",enrolled:0},{name:"Prince Selasie",calls:348,noAns:335,voicemail:0,wrong:3,notInterested:7,dnc:0,callback:0,expired:0,finishedSystem:3,moving:0,langBarrier:0,avgPreview:"01:11",avgConv:"00:14",enrolled:0,paid:0}] },
  { date:"2026-05-22", partial:false, agents:5, dispositions:{noAns:762,voicemail:594,wrong:116,notInterested:79,dnc:16,callback:6,expired:32,finishedSystem:16,moving:1,langBarrier:4}, timing:{previewAT:"01:08",convAT:"00:15"}, enrolled:0, sales:{submitted:0,paid:0,pending:0,utilityDenied:0,qcDenied:0,cancelled:0}, agentData:[{name:"Anna Amponsah",calls:356,noAns:56,voicemail:224,wrong:49,notInterested:20,dnc:3,callback:0,expired:0,finishedSystem:2,moving:1,langBarrier:1,avgPreview:"01:05",avgConv:"00:20",enrolled:0},{name:"Abigal Duodom",calls:301,noAns:143,voicemail:96,wrong:32,notInterested:25,dnc:1,callback:0,expired:0,finishedSystem:2,moving:0,langBarrier:1,avgPreview:"01:10",avgConv:"00:13",enrolled:0},{name:"Frances Obaze",calls:358,noAns:136,voicemail:163,wrong:3,notInterested:13,dnc:7,callback:2,expired:32,finishedSystem:1,moving:0,langBarrier:0,avgPreview:"00:51",avgConv:"00:17",enrolled:0},{name:"Nick Baffour",calls:300,noAns:129,voicemail:111,wrong:30,notInterested:13,dnc:4,callback:2,expired:0,finishedSystem:9,moving:0,langBarrier:2,avgPreview:"01:12",avgConv:"00:08",enrolled:0},{name:"Prince Selasie",calls:314,noAns:298,voicemail:0,wrong:2,notInterested:8,dnc:1,callback:2,expired:0,finishedSystem:2,moving:0,langBarrier:0,avgPreview:"01:20",avgConv:"00:16",enrolled:0,paid:0}] },
  { date:"2026-05-23", partial:false, agents:5, dispositions:{noAns:801,voicemail:469,wrong:99,notInterested:68,dnc:10,callback:4,expired:29,finishedSystem:5,moving:0,langBarrier:7}, timing:{previewAT:"00:53",convAT:"00:10"}, enrolled:0, sales:{submitted:0,paid:0,pending:0,utilityDenied:0,qcDenied:0,cancelled:0}, agentData:[{name:"Anna Amponsah",calls:252,noAns:61,voicemail:142,wrong:33,notInterested:13,dnc:0,callback:0,expired:0,finishedSystem:0,moving:0,langBarrier:3,avgPreview:"00:48",avgConv:"00:14",enrolled:0},{name:"Abigal Duodom",calls:331,noAns:182,voicemail:86,wrong:36,notInterested:21,dnc:1,callback:2,expired:0,finishedSystem:2,moving:0,langBarrier:1,avgPreview:"00:55",avgConv:"00:06",enrolled:0},{name:"Frances Obaze",calls:263,noAns:59,voicemail:146,wrong:0,notInterested:18,dnc:8,callback:1,expired:29,finishedSystem:0,moving:0,langBarrier:2,avgPreview:"00:29",avgConv:"00:08",enrolled:0},{name:"Nick Baffour",calls:300,noAns:159,voicemail:95,wrong:28,notInterested:14,dnc:1,callback:1,expired:0,finishedSystem:2,moving:0,langBarrier:0,avgPreview:"01:17",avgConv:"00:07",enrolled:0},{name:"Prince Selasie",calls:346,noAns:340,voicemail:0,wrong:2,notInterested:2,dnc:0,callback:0,expired:0,finishedSystem:1,moving:0,langBarrier:1,avgPreview:"01:09",avgConv:"00:16",enrolled:0,paid:0}] },
  { date:"2026-05-25", partial:false, agents:5, dispositions:{noAns:803,voicemail:535,wrong:126,notInterested:63,dnc:14,callback:3,expired:24,finishedSystem:7,moving:0,langBarrier:2}, timing:{previewAT:"00:55",convAT:"00:12"}, enrolled:0, sales:{submitted:0,paid:0,pending:0,utilityDenied:0,qcDenied:0,cancelled:0}, agentData:[{name:"Anna Amponsah",calls:303,noAns:57,voicemail:172,wrong:55,notInterested:14,dnc:2,callback:0,expired:0,finishedSystem:1,moving:0,langBarrier:2,avgPreview:"00:47",avgConv:"00:12",enrolled:0},{name:"Abigal Duodom",calls:360,noAns:184,voicemail:119,wrong:28,notInterested:24,dnc:2,callback:1,expired:0,finishedSystem:2,moving:0,langBarrier:0,avgPreview:"00:44",avgConv:"00:10",enrolled:0},{name:"Frances Obaze",calls:309,noAns:114,voicemail:149,wrong:2,notInterested:8,dnc:9,callback:1,expired:24,finishedSystem:1,moving:0,langBarrier:0,avgPreview:"00:48",avgConv:"00:13",enrolled:0},{name:"Nick Baffour",calls:302,noAns:150,voicemail:95,wrong:41,notInterested:13,dnc:1,callback:0,expired:0,finishedSystem:2,moving:0,langBarrier:0,avgPreview:"01:10",avgConv:"00:07",enrolled:0},{name:"Prince Selasie",calls:304,noAns:298,voicemail:0,wrong:0,notInterested:4,dnc:0,callback:1,expired:0,finishedSystem:1,moving:0,langBarrier:0,avgPreview:"01:17",avgConv:"00:16",enrolled:0,paid:0}] },
  { date:"2026-05-26", partial:false, agents:5, dispositions:{noAns:762,voicemail:501,wrong:124,notInterested:84,dnc:13,callback:3,expired:21,finishedSystem:11,moving:1,langBarrier:7}, timing:{previewAT:"01:02",convAT:"00:11"}, enrolled:0, sales:{submitted:0,paid:0,pending:0,utilityDenied:0,qcDenied:0,cancelled:0}, agentData:[{name:"Anna Amponsah",calls:361,noAns:71,voicemail:207,wrong:58,notInterested:19,dnc:2,callback:0,expired:0,finishedSystem:0,moving:1,langBarrier:3,avgPreview:"01:00",avgConv:"00:12",enrolled:0},{name:"Abigal Duodom",calls:350,noAns:172,voicemail:101,wrong:40,notInterested:30,dnc:1,callback:0,expired:0,finishedSystem:5,moving:0,langBarrier:1,avgPreview:"00:48",avgConv:"00:09",enrolled:0},{name:"Frances Obaze",calls:201,noAns:74,voicemail:86,wrong:1,notInterested:11,dnc:6,callback:1,expired:20,finishedSystem:1,moving:0,langBarrier:1,avgPreview:"00:52",avgConv:"00:13",enrolled:0},{name:"Nick Baffour",calls:307,noAns:149,voicemail:107,wrong:22,notInterested:20,dnc:4,callback:1,expired:0,finishedSystem:2,moving:0,langBarrier:2,avgPreview:"01:16",avgConv:"00:08",enrolled:0},{name:"Prince Selasie",calls:308,noAns:296,voicemail:0,wrong:3,notInterested:4,dnc:0,callback:1,expired:1,finishedSystem:3,moving:0,langBarrier:0,avgPreview:"01:14",avgConv:"00:15",enrolled:0,paid:0}] },
  { date:"2026-05-27", partial:false, agents:5, dispositions:{noAns:787,voicemail:573,wrong:147,notInterested:122,dnc:11,callback:7,expired:51,finishedSystem:11,moving:0,langBarrier:16}, timing:{previewAT:"01:02",convAT:"00:12"}, enrolled:0, sales:{submitted:0,paid:0,pending:0,utilityDenied:0,qcDenied:0,cancelled:0}, agentData:[{name:"Anna Amponsah",calls:382,noAns:68,voicemail:216,wrong:65,notInterested:28,dnc:1,callback:1,expired:0,finishedSystem:0,moving:0,langBarrier:3,avgPreview:"00:59",avgConv:"00:11",enrolled:0},{name:"Abigal Duodom",calls:355,noAns:180,voicemail:95,wrong:45,notInterested:27,dnc:3,callback:0,expired:0,finishedSystem:4,moving:0,langBarrier:1,avgPreview:"00:59",avgConv:"00:09",enrolled:0},{name:"Frances Obaze",calls:358,noAns:121,voicemail:144,wrong:1,notInterested:29,dnc:5,callback:2,expired:51,finishedSystem:1,moving:0,langBarrier:4,avgPreview:"00:38",avgConv:"00:13",enrolled:0},{name:"Nick Baffour",calls:310,noAns:123,voicemail:118,wrong:35,notInterested:27,dnc:2,callback:0,expired:0,finishedSystem:3,moving:0,langBarrier:2,avgPreview:"01:15",avgConv:"00:08",enrolled:0},{name:"Prince Selasie",calls:320,noAns:295,voicemail:0,wrong:1,notInterested:11,dnc:0,callback:4,expired:0,finishedSystem:3,moving:0,langBarrier:6,avgPreview:"01:17",avgConv:"00:18",enrolled:0,paid:0}] },
  {
    date:"2026-05-28",partial:false,agents:5,
    dispositions:{noAns:761,voicemail:548,wrong:97,notInterested:96,dnc:13,callback:8,expired:25,finishedSystem:16,moving:2,langBarrier:9},
    timing:{previewAT:"01:04",convAT:"00:12"},
    enrolled:0,
    sales:{submitted:0,paid:0,pending:0,utilityDenied:0,qcDenied:0,cancelled:0},
    agentData:[
      {name:"Anna Amponsah",calls:347,noAns:93,voicemail:191,wrong:35,notInterested:19,dnc:1,callback:2,expired:0,finishedSystem:0,moving:1,langBarrier:5,avgPreview:"01:09",avgConv:"00:11",enrolled:0,paid:0},
      {name:"Abigal Duodom",calls:305,noAns:137,voicemail:98,wrong:30,notInterested:34,dnc:3,callback:1,expired:0,finishedSystem:1,moving:1,langBarrier:0,avgPreview:"01:06",avgConv:"00:09",enrolled:0,paid:0},
      {name:"Frances Obaze",calls:353,noAns:124,voicemail:159,wrong:2,notInterested:21,dnc:8,callback:5,expired:24,finishedSystem:7,moving:0,langBarrier:3,avgPreview:"00:59",avgConv:"00:16",enrolled:0,paid:0},
      {name:"Nick Baffour",calls:300,noAns:150,voicemail:100,wrong:30,notInterested:14,dnc:1,callback:0,expired:0,finishedSystem:4,moving:0,langBarrier:0,avgPreview:"00:59",avgConv:"00:08",enrolled:0,paid:0},
      {name:"Prince Selasie",calls:271,noAns:257,voicemail:0,wrong:0,notInterested:8,dnc:0,callback:0,expired:1,finishedSystem:4,moving:0,langBarrier:1,avgPreview:"01:30",avgConv:"00:18",enrolled:0,paid:0},
    ]
  },
  {
    date:"2026-05-29",partial:false,agents:5,
    dispositions:{noAns:798,voicemail:512,wrong:108,notInterested:81,dnc:9,callback:7,expired:22,finishedSystem:10,moving:1,langBarrier:19},
    timing:{previewAT:"01:03",convAT:"00:12"},
    sales:{submitted:0,paid:0,pending:0,utilityDenied:0,qcDenied:0,cancelled:0},
    agentData:[
      {name:"Anna Amponsah",calls:352,noAns:95,voicemail:185,wrong:43,notInterested:21,dnc:1,callback:2,expired:0,finishedSystem:0,moving:1,langBarrier:4,avgPreview:"01:11",avgConv:"00:12",enrolled:0,paid:0},
      {name:"Abigal Duodom",calls:321,noAns:176,voicemail:77,wrong:34,notInterested:19,dnc:1,callback:2,expired:0,finishedSystem:7,moving:0,langBarrier:5,avgPreview:"00:55",avgConv:"00:09",enrolled:0,paid:0},
      {name:"Frances Obaze",calls:366,noAns:155,voicemail:153,wrong:0,notInterested:19,dnc:6,callback:1,expired:22,finishedSystem:2,moving:0,langBarrier:7,avgPreview:"01:02",avgConv:"00:15",enrolled:0,paid:0},
      {name:"Nick Baffour",calls:314,noAns:166,voicemail:97,wrong:31,notInterested:16,dnc:1,callback:2,expired:0,finishedSystem:0,moving:0,langBarrier:1,avgPreview:"01:12",avgConv:"00:09",enrolled:0,paid:0},
      {name:"Prince Selasie",calls:215,noAns:206,voicemail:0,wrong:0,notInterested:6,dnc:0,callback:0,expired:0,finishedSystem:1,moving:0,langBarrier:2,avgPreview:"01:08",avgConv:"00:18",enrolled:0,paid:0},
    ]
  },
  {
    date:"2026-05-30",partial:false,agents:5,
    dispositions:{noAns:954,voicemail:395,wrong:91,notInterested:67,dnc:5,callback:4,expired:22,finishedSystem:21,moving:1,langBarrier:3},
    timing:{previewAT:"01:04",convAT:"00:11"},
    sales:{submitted:0,paid:0,pending:0,utilityDenied:0,qcDenied:0,cancelled:0},
    agentData:[
      {name:"Anna Amponsah",calls:340,noAns:99,voicemail:183,wrong:42,notInterested:12,dnc:2,callback:0,expired:0,finishedSystem:1,moving:1,langBarrier:0,avgPreview:"01:09",avgConv:"00:08",enrolled:0,paid:0},
      {name:"Abigal Duodom",calls:305,noAns:206,voicemail:51,wrong:20,notInterested:23,dnc:1,callback:0,expired:0,finishedSystem:4,moving:0,langBarrier:0,avgPreview:"00:49",avgConv:"00:08",enrolled:0,paid:0},
      {name:"Frances Obaze",calls:265,noAns:135,voicemail:87,wrong:3,notInterested:8,dnc:2,callback:1,expired:22,finishedSystem:4,moving:0,langBarrier:3,avgPreview:"01:15",avgConv:"00:15",enrolled:0,paid:0},
      {name:"Nick Baffour",calls:305,noAns:174,voicemail:74,wrong:26,notInterested:17,dnc:0,callback:3,expired:0,finishedSystem:11,moving:0,langBarrier:0,avgPreview:"00:44",avgConv:"00:07",enrolled:0,paid:0},
      {name:"Prince Selasie",calls:349,noAns:340,voicemail:0,wrong:0,notInterested:7,dnc:0,callback:0,expired:0,finishedSystem:1,moving:0,langBarrier:0,avgPreview:"01:24",avgConv:"00:16",enrolled:0,paid:0},
    ]
  },
  {
    date:"2026-06-01",partial:false,agents:5,
    dispositions:{noAns:835,voicemail:424,wrong:110,notInterested:70,dnc:9,callback:6,expired:13,finishedSystem:8,moving:1,langBarrier:13},
    timing:{previewAT:"01:05",convAT:"00:12"},
    sales:{submitted:1,paid:0,pending:1,utilityDenied:0,qcDenied:0,cancelled:0},
    agentData:[
      {name:"Anna Amponsah",calls:321,noAns:70,voicemail:188,wrong:42,notInterested:18,dnc:0,callback:0,expired:0,finishedSystem:0,moving:0,langBarrier:2,avgPreview:"01:04",avgConv:"00:10",enrolled:0,paid:0},
      {name:"Abigal Duodom",calls:302,noAns:205,voicemail:50,wrong:25,notInterested:14,dnc:2,callback:3,expired:0,finishedSystem:3,moving:0,langBarrier:0,avgPreview:"00:57",avgConv:"00:07",enrolled:0,paid:0},
      {name:"Frances Obaze",calls:300,noAns:155,voicemail:95,wrong:4,notInterested:16,dnc:7,callback:0,expired:13,finishedSystem:3,moving:1,langBarrier:5,avgPreview:"01:17",avgConv:"00:15",enrolled:0,paid:0},
      {name:"Nick Baffour",calls:305,noAns:153,voicemail:91,wrong:37,notInterested:18,dnc:0,callback:1,expired:0,finishedSystem:1,moving:0,langBarrier:4,avgPreview:"01:06",avgConv:"00:07",enrolled:0,paid:0},
      {name:"Prince Selasie",calls:264,noAns:252,voicemail:0,wrong:2,notInterested:4,dnc:0,callback:2,expired:0,finishedSystem:1,moving:0,langBarrier:2,avgPreview:"01:21",avgConv:"00:21",enrolled:1,paid:0},
    ]
  },
  {
    date:"2026-06-02",partial:false,agents:5,
    dispositions:{noAns:726,voicemail:428,wrong:122,notInterested:85,dnc:13,callback:4,expired:17,finishedSystem:13,moving:1,langBarrier:18},
    timing:{previewAT:"01:15",convAT:"00:10"},
    sales:{submitted:0,paid:0,pending:0,utilityDenied:0,qcDenied:0,cancelled:0},
    agentData:[
      {name:"Anna Amponsah",calls:336,noAns:77,voicemail:174,wrong:57,notInterested:20,dnc:1,callback:1,expired:0,finishedSystem:0,moving:0,langBarrier:6,avgPreview:"01:11",avgConv:"00:08",enrolled:0,paid:0},
      {name:"Abigal Duodom",calls:300,noAns:171,voicemail:67,wrong:29,notInterested:24,dnc:2,callback:0,expired:0,finishedSystem:4,moving:0,langBarrier:3,avgPreview:"01:08",avgConv:"00:07",enrolled:0,paid:0},
      {name:"Frances Obaze",calls:268,noAns:113,voicemail:95,wrong:7,notInterested:15,dnc:8,callback:1,expired:17,finishedSystem:2,moving:1,langBarrier:8,avgPreview:"01:20",avgConv:"00:16",enrolled:0,paid:0},
      {name:"Nick Baffour",calls:306,noAns:156,voicemail:92,wrong:29,notInterested:22,dnc:0,callback:1,expired:0,finishedSystem:5,moving:0,langBarrier:1,avgPreview:"01:16",avgConv:"00:08",enrolled:0,paid:0},
      {name:"Prince Selasie",calls:218,noAns:209,voicemail:0,wrong:0,notInterested:4,dnc:2,callback:1,expired:0,finishedSystem:2,moving:0,langBarrier:0,avgPreview:"01:19",avgConv:"00:22",enrolled:0,paid:0},
    ]
  },
  {
    date:"2026-06-04",partial:false,agents:5,
    dispositions:{noAns:737,voicemail:304,wrong:119,notInterested:82,dnc:5,callback:3,expired:8,finishedSystem:16,moving:0,langBarrier:7},
    timing:{previewAT:"01:13",convAT:"00:11"},
    sales:{submitted:0,paid:0,pending:0,utilityDenied:0,qcDenied:0,cancelled:0},
    enrolled:0,
    agentData:[
      {name:"Anna Amponsah",calls:152,noAns:46,voicemail:61,wrong:27,notInterested:16,dnc:1,callback:0,avgPreview:"01:20",avgConv:"00:28",enrolled:0,paid:0},
      {name:"Abigal Duodom",calls:270,noAns:141,voicemail:70,wrong:37,notInterested:16,dnc:0,callback:0,avgPreview:"01:07",avgConv:"00:25",enrolled:0,paid:0},
      {name:"Frances Obaze",calls:268,noAns:125,voicemail:102,wrong:12,notInterested:12,dnc:1,callback:2,avgPreview:"01:07",avgConv:"01:46",enrolled:0,paid:0},
      {name:"Nick Baffour",calls:300,noAns:145,voicemail:71,wrong:42,notInterested:30,dnc:3,callback:0,avgPreview:"01:11",avgConv:"00:24",enrolled:0,paid:0},
      {name:"Prince Selasie",calls:292,noAns:280,voicemail:0,wrong:1,notInterested:8,dnc:0,callback:1,avgPreview:"01:20",avgConv:"00:57",enrolled:0,paid:0},
    ]
  },
  {
    date:"2026-06-05",partial:false,agents:5,
    dispositions:{noAns:785,voicemail:389,wrong:97,notInterested:85,dnc:8,callback:3,expired:4,finishedSystem:14,moving:2,langBarrier:5},
    timing:{previewAT:"01:15",convAT:"00:08"},
    sales:{submitted:0,paid:0,pending:0,utilityDenied:0,qcDenied:0,cancelled:0},
    enrolled:0,
    agentData:[
      {name:"Anna Amponsah",calls:308,noAns:76,voicemail:170,wrong:29,notInterested:26,dnc:0,callback:2,avgPreview:"01:17",avgConv:"00:25",enrolled:0,paid:0},
      {name:"Abigal Duodom",calls:305,noAns:168,voicemail:77,wrong:31,notInterested:24,dnc:0,callback:0,avgPreview:"01:13",avgConv:"00:21",enrolled:0,paid:0},
      {name:"Frances Obaze",calls:171,noAns:87,voicemail:64,wrong:4,notInterested:3,dnc:6,callback:0,avgPreview:"01:11",avgConv:"00:34",enrolled:0,paid:0},
      {name:"Nick Baffour",calls:305,noAns:162,voicemail:78,wrong:33,notInterested:22,dnc:2,callback:1,avgPreview:"01:17",avgConv:"00:30",enrolled:0,paid:0},
      {name:"Prince Selasie",calls:304,noAns:292,voicemail:0,wrong:0,notInterested:10,dnc:0,callback:0,avgPreview:"01:19",avgConv:"00:25",enrolled:0,paid:0},
    ]
  },
  {
    date:"2026-06-06",partial:false,agents:5,
    dispositions:{noAns:990,voicemail:596,wrong:115,notInterested:96,dnc:3,callback:1,expired:18,finishedSystem:19,moving:10,langBarrier:19},
    timing:{previewAT:"01:01",convAT:"00:07"},
    sales:{submitted:0,paid:0,pending:0,utilityDenied:0,qcDenied:0,cancelled:0},
    enrolled:0,
    agentData:[
      {name:"Anna Amponsah",calls:322,noAns:72,voicemail:192,wrong:38,notInterested:13,dnc:1,callback:0,avgPreview:"01:17",avgConv:"00:21",enrolled:0,paid:0},
      {name:"Abigal Duodom",calls:300,noAns:187,voicemail:62,wrong:22,notInterested:20,dnc:1,callback:0,avgPreview:"01:02",avgConv:"00:21",enrolled:0,paid:0},
      {name:"Frances Obaze",calls:418,noAns:240,voicemail:119,wrong:14,notInterested:16,dnc:1,callback:1,avgPreview:"00:54",avgConv:"00:33",enrolled:0,paid:0},
      {name:"Nick Baffour",calls:301,noAns:159,voicemail:84,wrong:32,notInterested:16,dnc:0,callback:0,avgPreview:"01:04",avgConv:"00:25",enrolled:0,paid:0},
      {name:"Prince Selasie",calls:527,noAns:332,voicemail:139,wrong:9,notInterested:31,dnc:0,callback:0,avgPreview:"00:47",avgConv:"00:24",enrolled:0,paid:0},
    ]
  },
  {
    date:"2026-06-08",partial:false,agents:5,
    dispositions:{noAns:990,voicemail:435,wrong:161,notInterested:82,dnc:8,callback:3,expired:7,finishedSystem:15,moving:0,langBarrier:18},
    timing:{previewAT:"01:11",convAT:"00:07"},
    sales:{submitted:0,paid:0,pending:0,utilityDenied:0,qcDenied:0,cancelled:0},
    enrolled:0,
    agentData:[
      {name:"Anna Amponsah",calls:318,noAns:85,voicemail:145,wrong:52,notInterested:28,dnc:0,callback:0,avgPreview:"01:17",avgConv:"00:21",enrolled:0,paid:0},
      {name:"Abigal Duodom",calls:325,noAns:180,voicemail:101,wrong:19,notInterested:15,dnc:5,callback:0,avgPreview:"01:08",avgConv:"00:19",enrolled:0,paid:0},
      {name:"Frances Obaze",calls:370,noAns:216,voicemail:100,wrong:22,notInterested:13,dnc:3,callback:3,avgPreview:"01:04",avgConv:"01:09",enrolled:0,paid:0},
      {name:"Nick Baffour",calls:310,noAns:157,voicemail:89,wrong:41,notInterested:15,dnc:0,callback:0,avgPreview:"01:14",avgConv:"00:21",enrolled:0,paid:0},
      {name:"Prince Selasie",calls:396,noAns:352,voicemail:0,wrong:27,notInterested:11,dnc:0,callback:0,avgPreview:"01:14",avgConv:"00:33",enrolled:0,paid:0},
    ]
  },
  {
    date:"2026-06-09",partial:false,agents:5,
    dispositions:{noAns:993,voicemail:381,wrong:126,notInterested:77,dnc:9,callback:1,expired:18,finishedSystem:18,moving:0,langBarrier:30},
    timing:{previewAT:"01:01",convAT:"00:06"},
    sales:{submitted:0,paid:0,pending:0,utilityDenied:0,qcDenied:0,cancelled:0},
    enrolled:0,
    agentData:[
      {name:"Anna Amponsah",calls:340,noAns:97,voicemail:159,wrong:53,notInterested:20,dnc:1,callback:0,avgPreview:"01:02",avgConv:"00:26",enrolled:0,paid:0},
      {name:"Abigal Duodom",calls:315,noAns:223,voicemail:52,wrong:13,notInterested:18,dnc:1,callback:0,avgPreview:"01:01",avgConv:"00:25",enrolled:0,paid:0},
      {name:"Frances Obaze",calls:348,noAns:189,voicemail:96,wrong:16,notInterested:11,dnc:6,callback:0,avgPreview:"00:55",avgConv:"00:25",enrolled:0,paid:0},
      {name:"Nick Baffour",calls:320,noAns:168,voicemail:74,wrong:44,notInterested:23,dnc:0,callback:0,avgPreview:"01:01",avgConv:"00:28",enrolled:0,paid:0},
      {name:"Prince Selasie",calls:330,noAns:316,voicemail:0,wrong:0,notInterested:5,dnc:1,callback:1,avgPreview:"01:09",avgConv:"01:03",enrolled:0,paid:0},
    ]
  },
  {
    date:"2026-06-10",partial:false,agents:5,
    dispositions:{noAns:854,voicemail:397,wrong:131,notInterested:93,dnc:11,callback:7,expired:10,finishedSystem:20,moving:1,langBarrier:34},
    timing:{previewAT:"01:08",convAT:"00:06"},
    sales:{submitted:0,paid:0,pending:0,utilityDenied:0,qcDenied:0,cancelled:0},
    enrolled:0,
    agentData:[
      {name:"Anna Amponsah",calls:332,noAns:82,voicemail:168,wrong:50,notInterested:24,dnc:0,callback:0,avgPreview:"01:10",avgConv:"00:24",enrolled:0,paid:0},
      {name:"Abigal Duodom",calls:310,noAns:185,voicemail:60,wrong:31,notInterested:21,dnc:2,callback:1,avgPreview:"01:06",avgConv:"00:26",enrolled:0,paid:0},
      {name:"Frances Obaze",calls:304,noAns:165,voicemail:76,wrong:9,notInterested:15,dnc:7,callback:2,avgPreview:"01:13",avgConv:"00:31",enrolled:0,paid:0},
      {name:"Nick Baffour",calls:321,noAns:154,voicemail:93,wrong:41,notInterested:16,dnc:2,callback:2,avgPreview:"01:07",avgConv:"00:44",enrolled:0,paid:0},
      {name:"Prince Selasie",calls:292,noAns:268,voicemail:0,wrong:0,notInterested:17,dnc:0,callback:2,avgPreview:"01:24",avgConv:"00:46",enrolled:0,paid:0},
    ]
  },
  {
    date:"2026-06-11",partial:false,agents:5,
    dispositions:{noAns:1089,voicemail:327,wrong:125,notInterested:73,dnc:6,callback:0,expired:10,finishedSystem:16,moving:0,langBarrier:1},
    timing:{previewAT:"01:07",convAT:"00:05"},
    sales:{submitted:0,paid:0,pending:0,utilityDenied:0,qcDenied:0,cancelled:0},
    enrolled:0,
    agentData:[
      {name:"Anna Amponsah",calls:315,noAns:109,voicemail:135,wrong:48,notInterested:21,dnc:2,callback:0,avgPreview:"01:17",avgConv:"00:25",enrolled:0,paid:0},
      {name:"Abigal Duodom",calls:320,noAns:201,voicemail:66,wrong:28,notInterested:19,dnc:0,callback:0,avgPreview:"01:03",avgConv:"00:19",enrolled:0,paid:0},
      {name:"Frances Obaze",calls:406,noAns:320,voicemail:47,wrong:16,notInterested:9,dnc:2,callback:0,avgPreview:"00:53",avgConv:"00:23",enrolled:0,paid:0},
      {name:"Nick Baffour",calls:320,noAns:183,voicemail:79,wrong:33,notInterested:19,dnc:2,callback:0,avgPreview:"01:11",avgConv:"00:25",enrolled:0,paid:0},
      {name:"Prince Selasie",calls:286,noAns:276,voicemail:0,wrong:0,notInterested:5,dnc:0,callback:0,avgPreview:"01:15",avgConv:"00:20",enrolled:0,paid:0},
    ]
  },
  {
    date:"2026-06-12",partial:false,agents:5,
    dispositions:{noAns:1020,voicemail:408,wrong:113,notInterested:58,dnc:10,callback:1,expired:17,finishedSystem:10,moving:0,langBarrier:2},
    timing:{previewAT:"01:06",convAT:"00:06"},
    sales:{submitted:0,paid:0,pending:0,utilityDenied:0,qcDenied:0,cancelled:0},
    enrolled:0,
    agentData:[
      {name:"Anna Amponsah",calls:324,noAns:107,voicemail:162,wrong:38,notInterested:15,dnc:1,callback:0,avgPreview:"01:17",avgConv:"00:16",enrolled:0,paid:0},
      {name:"Abigal Duodom",calls:337,noAns:228,voicemail:62,wrong:30,notInterested:10,dnc:0,callback:0,avgPreview:"01:01",avgConv:"00:12",enrolled:0,paid:0},
      {name:"Frances Obaze",calls:364,noAns:213,voicemail:93,wrong:16,notInterested:15,dnc:8,callback:0,avgPreview:"00:55",avgConv:"00:32",enrolled:0,paid:0},
      {name:"Nick Baffour",calls:320,noAns:184,voicemail:91,wrong:29,notInterested:14,dnc:1,callback:0,avgPreview:"01:16",avgConv:"00:17",enrolled:0,paid:0},
      {name:"Prince Selasie",calls:295,noAns:288,voicemail:0,wrong:0,notInterested:4,dnc:0,callback:1,avgPreview:"01:24",avgConv:"04:09",enrolled:0,paid:0},
    ]
  },
  {
    date:"2026-06-13",partial:false,agents:5,
    dispositions:{noAns:1000,voicemail:292,wrong:122,notInterested:53,dnc:10,callback:3,expired:9,finishedSystem:18,moving:0,langBarrier:6},
    timing:{previewAT:"01:11",convAT:"00:05"},
    sales:{submitted:0,paid:0,pending:0,utilityDenied:0,qcDenied:0,cancelled:0},
    enrolled:0,
    agentData:[
      {name:"Anna Amponsah",calls:304,noAns:136,voicemail:127,wrong:26,notInterested:13,dnc:0,callback:0,avgPreview:"01:23",avgConv:"00:22",enrolled:0,paid:0},
      {name:"Abigal Duodom",calls:307,noAns:214,voicemail:31,wrong:36,notInterested:14,dnc:5,callback:1,avgPreview:"01:04",avgConv:"00:45",enrolled:0,paid:0},
      {name:"Frances Obaze",calls:291,noAns:143,voicemail:88,wrong:24,notInterested:16,dnc:4,callback:1,avgPreview:"01:02",avgConv:"00:30",enrolled:0,paid:0},
      {name:"Nick Baffour",calls:304,noAns:205,voicemail:45,wrong:36,notInterested:8,dnc:1,callback:1,avgPreview:"01:08",avgConv:"00:27",enrolled:0,paid:0},
      {name:"Prince Selasie",calls:307,noAns:302,voicemail:1,wrong:0,notInterested:2,dnc:0,callback:0,avgPreview:"01:21",avgConv:"00:33",enrolled:0,paid:0},
    ]
  },
  {
    date:"2026-06-15",partial:false,agents:5,
    dispositions:{noAns:1081,voicemail:319,wrong:224,notInterested:90,dnc:8,callback:2,expired:17,finishedSystem:16,moving:0,langBarrier:7},
    timing:{previewAT:"01:08",convAT:"00:06"},
    sales:{submitted:1,paid:0,pending:1,utilityDenied:0,qcDenied:0,cancelled:0},
    enrolled:1,
    agentData:[
      {name:"Anna Amponsah",calls:334,noAns:139,voicemail:116,wrong:65,notInterested:10,dnc:1,callback:0,avgPreview:"01:12",avgConv:"00:16",enrolled:0,paid:0},
      {name:"Abigal Duodom",calls:306,noAns:223,voicemail:35,wrong:21,notInterested:20,dnc:2,callback:1,avgPreview:"01:14",avgConv:"00:22",enrolled:0,paid:0},
      {name:"Frances Obaze",calls:351,noAns:242,voicemail:63,wrong:17,notInterested:7,dnc:4,callback:0,avgPreview:"01:08",avgConv:"01:15",enrolled:1,paid:0},
      {name:"Nick Baffour",calls:331,noAns:180,voicemail:66,wrong:55,notInterested:20,dnc:1,callback:1,avgPreview:"01:09",avgConv:"00:24",enrolled:0,paid:0},
      {name:"Prince Selasie",calls:444,noAns:297,voicemail:39,wrong:66,notInterested:33,dnc:0,callback:0,avgPreview:"00:57",avgConv:"00:14",enrolled:1,paid:0},
    ]
  },
  {
    date:"2026-06-16",partial:false,agents:5,
    dispositions:{noAns:996,voicemail:351,wrong:177,notInterested:65,dnc:12,callback:2,expired:32,finishedSystem:10,moving:0,langBarrier:7},
    timing:{previewAT:"01:09",convAT:"00:05"},
    sales:{submitted:0,paid:0,pending:0,utilityDenied:0,qcDenied:0,cancelled:0},
    enrolled:0,
    agentData:[
      {name:"Anna Amponsah",calls:322,noAns:133,voicemail:116,wrong:58,notInterested:9,dnc:2,callback:0,avgPreview:"01:16",avgConv:"00:16",enrolled:0,paid:0},
      {name:"Abigal Duodom",calls:300,noAns:227,voicemail:30,wrong:22,notInterested:14,dnc:2,callback:0,avgPreview:"01:07",avgConv:"00:19",enrolled:0,paid:0},
      {name:"Frances Obaze",calls:361,noAns:218,voicemail:73,wrong:19,notInterested:13,dnc:5,callback:1,avgPreview:"00:54",avgConv:"00:37",enrolled:0,paid:0},
      {name:"Nick Baffour",calls:310,noAns:186,voicemail:61,wrong:38,notInterested:21,dnc:2,callback:1,avgPreview:"01:19",avgConv:"00:24",enrolled:0,paid:0},
      {name:"Prince Selasie",calls:359,noAns:232,voicemail:71,wrong:40,notInterested:8,dnc:1,callback:0,avgPreview:"01:08",avgConv:"00:26",enrolled:0,paid:0},
    ]
  },
];


const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const fmtDate = s => { const p=s.split("-"); return parseInt(p[2])+" "+MONTHS[parseInt(p[1])-1]; };
const fmtDateFull = s => { const d=new Date(s+"T12:00:00"); return DAYS[d.getDay()]+" "+parseInt(s.split("-")[2])+" "+MONTHS[parseInt(s.split("-")[1])-1]; };
const fn = n => n!=null ? n.toLocaleString() : "—";
const fp = (n,t) => t>0 ? (n/t*100).toFixed(1)+"%" : "0.0%";
const tc = d => { const x=d.dispositions; return (x.noAns||0)+(x.voicemail||0)+(x.wrong||0)+(x.notInterested||0)+(x.dnc||0)+(x.callback||0)+(x.expired||0)+(x.finishedSystem||0)+(x.moving||0)+(x.langBarrier||0); };
const lc = d => d.dispositions.notInterested+d.dispositions.callback+d.dispositions.moving+d.dispositions.langBarrier;
const cr = d => { const t=tc(d); return t>0 ? parseFloat((lc(d)/t*100).toFixed(1)) : 0; };
const aLive = a => (a.notInterested||0)+(a.callback||0)+(a.moving||0)+(a.langBarrier||0);
const parsePT = s => { if(!s) return null; const [m,sec]=s.split(":"); return parseInt(m)*60+parseInt(sec); };
const wkOf = s => { const d=new Date(s+"T12:00:00"); const day=d.getDay(); const m=new Date(d); m.setDate(d.getDate()-((day+6)%7)); return m.toISOString().slice(0,10); };
const moOf = s => s.slice(0,7);



const REVENUE_PER_SALE = 100;
const rev = (paid) => paid * REVENUE_PER_SALE;
const fmtRev = (paid) => paid > 0 ? "$" + fn(paid * REVENUE_PER_SALE) : "$0";

const P = {"#3B7DDD", blueMid:"#85B7EB", blueLight:"#E6F1FB", green:"#2ECDA7", greenLight:"#E6FAF4", amber:"#F5A623", amberLight:"#FFF8EB", red:"#F2636F", redLight:"#FFF0F1", gray:"#8896AB", grayLight:"#E8ECF1", text:"#1A2332", textSec:"#6B7A90", textMuted:"#A3B1C4", card:"#FFFFFF", bg:"#F7F9FC" };
const font = "'Outfit', sans-serif";


const CT = ({ active, payload, label, unit="" }) => {
  if(!active||!payload?.length) return null;
  return (
    <div style={{background:P.card,border:`1px solid ${P.grayLight}`,borderRadius:8,padding:"8px 12px",fontSize:12,fontFamily:font}}>
      <p style={{margin:"0 0 4px",color:P.textSec,fontSize:11}}>{label}</p>
      {payload.map((p,i)=><p key={i} style={{margin:0,fontWeight:500,color:p.color}}>{fn(p.value)}{unit}</p>)}
    </div>
  );
};


function DateFilter({ dateFrom, dateTo, setDateFrom, setDateTo, allDates }) {
  const presets = [
    { label:"Last 14 days", fn:()=>{ const d=allDates[allDates.length-1]; const f=new Date(d+"T12:00:00"); f.setDate(f.getDate()-13); setDateFrom(f.toISOString().slice(0,10)); setDateTo(d); }},
    { label:"Last 30 days", fn:()=>{ const d=allDates[allDates.length-1]; const f=new Date(d+"T12:00:00"); f.setDate(f.getDate()-29); setDateFrom(f.toISOString().slice(0,10)); setDateTo(d); }},
    { label:"This month", fn:()=>{ const d=allDates[allDates.length-1]; const mo=d.slice(0,7); setDateFrom(allDates.find(x=>x.startsWith(mo))||d); setDateTo(d); }},
    { label:"All time", fn:()=>{ setDateFrom(""); setDateTo(""); }},
  ];
  const isActive = (p) => {
    if(p.label==="All time") return !dateFrom&&!dateTo;
    return false;
  };
  const sel = { padding:"5px 10px", borderRadius:8, border:`1px solid ${P.grayLight}`, fontSize:12, fontFamily:font, background:P.card, color:P.text, outline:"none" };
  const chip = (active) => ({ padding:"5px 13px", borderRadius:8, border:active?`1.5px solid ${P.blue}`:`1px solid ${P.grayLight}`, background:active?P.blueLight:P.card, color:active?P.blue:P.textSec, fontWeight:active?600:400, fontSize:12, cursor:"pointer", fontFamily:font });
  return (
    <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",background:P.card,border:`1px solid ${P.grayLight}`,borderRadius:12,padding:"10px 14px",marginBottom:16}}>
      {presets.map(p=><button key={p.label} style={chip(isActive(p))} onClick={p.fn}>{p.label}</button>)}
      <div style={{width:1,height:20,background:P.grayLight,margin:"0 4px"}}/>
      <span style={{fontSize:12,color:P.textSec}}>From</span>
      <select style={sel} value={dateFrom} onChange={e=>setDateFrom(e.target.value)}>
        <option value="">Earliest</option>
        {allDates.map(d=><option key={d} value={d}>{fmtDateFull(d)}</option>)}
      </select>
      <span style={{fontSize:12,color:P.textSec}}>To</span>
      <select style={sel} value={dateTo} onChange={e=>setDateTo(e.target.value)}>
        <option value="">Latest</option>
        {allDates.map(d=><option key={d} value={d}>{fmtDateFull(d)}</option>)}
      </select>
    </div>
  );
}


const Stat = ({label,value,sub,accent,bg}) => (
  <div style={{background:bg||P.bg,borderRadius:12,padding:"14px 16px",border:`1px solid ${P.grayLight}`}}>
    <div style={{fontSize:10.5,fontWeight:600,color:P.textMuted,textTransform:"uppercase",letterSpacing:".05em",marginBottom:4}}>{label}</div>
    <div style={{fontSize:22,fontWeight:700,color:accent||P.text,lineHeight:1.15}}>{value}</div>
    {sub&&<div style={{fontSize:11,color:P.textSec,marginTop:3}}>{sub}</div>}
  </div>
);


const ChartCard = ({title,children}) => (
  <div style={{background:P.card,border:`1px solid ${P.grayLight}`,borderRadius:14,padding:"16px 18px"}}>
    <p style={{margin:"0 0 12px",fontSize:11,fontWeight:600,color:P.textMuted,textTransform:"uppercase",letterSpacing:".04em"}}>{title}</p>
    {children}
  </div>
);


function WeeklyTable({ filtered }) {
  const [expanded, setExpanded] = useState({});
  const weeks = useMemo(()=>{
    const map = {};
    filtered.forEach(d => {
      const wk = wkOf(d.date);
      if(!map[wk]) map[wk] = [];
      map[wk].push(d);
    });
    return Object.entries(map).sort(([a],[b])=>a.localeCompare(b)).map(([wk,days])=>({wk, days, agg:{
      calls: days.reduce((s,d)=>s+tc(d),0),
      noAns: days.reduce((s,d)=>s+d.dispositions.noAns,0),
      voicemail: days.reduce((s,d)=>s+d.dispositions.voicemail,0),
      wrong: days.reduce((s,d)=>s+d.dispositions.wrong,0),
      notInterested: days.reduce((s,d)=>s+d.dispositions.notInterested,0),
      dnc: days.reduce((s,d)=>s+d.dispositions.dnc,0),
      live: days.reduce((s,d)=>s+lc(d),0),
      enrolled: days.reduce((s,d)=>s+(d.enrolled||0),0),
    }}));
  },[filtered]);

  const TH = ({ch,left})=><th style={{textAlign:left?"left":"center",padding:"9px 8px",fontSize:10.5,fontWeight:600,color:P.textMuted,textTransform:"uppercase",letterSpacing:".04em",borderBottom:`2px solid ${P.grayLight}`,whiteSpace:"nowrap"}}>{ch}</th>;
  const TD = ({ch,bold,accent,center=true})=><td style={{textAlign:center?"center":"left",padding:"9px 8px",fontSize:12,fontWeight:bold?600:400,color:accent||P.text}}>{ch}</td>;

  return (
    <div style={{background:P.card,border:`1px solid ${P.grayLight}`,borderRadius:14,padding:"18px 20px",overflowX:"auto"}}>
      <p style={{margin:"0 0 14px",fontSize:11,fontWeight:600,color:P.textMuted,textTransform:"uppercase",letterSpacing:".04em"}}>Disposition breakdown — click week to expand</p>
      <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
        <thead><tr><TH ch="Period" left/><TH ch="Calls"/><TH ch="No ans"/><TH ch="VM"/><TH ch="Wrong#"/><TH ch="Not int."/><TH ch="DNC"/><TH ch="Live"/><TH ch="Connect%"/><TH ch="Enrolled"/></tr></thead>
        <tbody>
          {weeks.map(({wk,days,agg})=>(
            <React.Fragment key={wk}>
              <tr onClick={()=>setExpanded(e=>({...e,[wk]:!e[wk]}))} style={{cursor:"pointer",background:P.blueLight,borderBottom:`1px solid ${P.grayLight}`}}>
                <td style={{padding:"10px 8px",fontWeight:600,color:P.blue,fontSize:12,whiteSpace:"nowrap"}}>
                  <span style={{marginRight:6,fontSize:10}}>{expanded[wk]?"▼":"▶"}</span>
                  Week of {fmtDate(wk)}
                  <span style={{marginLeft:8,fontSize:10,color:P.textSec,fontWeight:400}}>{days.length} day{days.length!==1?"s":""}</span>
                </td>
                <TD bold ch={fn(agg.calls)}/>
                <TD ch={fn(agg.noAns)}/>
                <TD ch={fn(agg.voicemail)}/>
                <TD ch={fn(agg.wrong)} accent={agg.calls>0&&agg.wrong/agg.calls>.1?P.red:null}/>
                <TD ch={fn(agg.notInterested)}/>
                <TD ch={fn(agg.dnc)}/>
                <TD bold accent={P.blue} ch={fn(agg.live)}/>
                <TD bold accent={P.green} ch={agg.calls>0?(agg.live/agg.calls*100).toFixed(1)+"%":"—"}/>
                <TD ch={fn(agg.enrolled)}/>
              </tr>
              {expanded[wk] && days.map((d,i)=>{
                const t=tc(d), l=lc(d);
                return (
                  <tr key={d.date} style={{background:i%2===0?"#FAFBFD":P.card,borderBottom:`1px solid ${P.grayLight}`}}>
                    <td style={{padding:"8px 8px 8px 24px",color:P.textSec,fontSize:11.5,whiteSpace:"nowrap"}}>
                      {fmtDateFull(d.date)}{d.partial?<span style={{color:P.amber,marginLeft:4,fontSize:9}}>●</span>:""}
                    </td>
                    <TD ch={fn(t)}/><TD ch={fn(d.dispositions.noAns)}/><TD ch={fn(d.dispositions.voicemail)}/>
                    <TD ch={fn(d.dispositions.wrong)} accent={t>0&&d.dispositions.wrong/t>.1?P.red:null}/>
                    <TD ch={fn(d.dispositions.notInterested)}/><TD ch={fn(d.dispositions.dnc)}/>
                    <TD bold accent={P.blue} ch={l}/>
                    <TD bold accent={P.green} ch={t>0?(l/t*100).toFixed(1)+"%":"—"}/>
                    <TD ch={d.enrolled||0}/>
                  </tr>
                );
              })}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}


function AgentProfile({ name, onBack, allData }) {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const allDates = allData.filter(d=>d.agentData.length>0).map(d=>d.date);
  const filtered = useMemo(()=>{
    let d = allData.filter(x=>x.agentData.some(a=>a.name===name));
    if(dateFrom) d=d.filter(x=>x.date>=dateFrom);
    if(dateTo) d=d.filter(x=>x.date<=dateTo);
    return d.map(day=>({date:day.date,partial:day.partial,...day.agentData.find(a=>a.name===name)}));
  },[allData,name,dateFrom,dateTo]);

  const totals = useMemo(()=>({
    calls:filtered.reduce((s,d)=>s+d.calls,0),
    live:filtered.reduce((s,d)=>s+aLive(d),0),
    wrong:filtered.reduce((s,d)=>s+(d.wrong||0),0),
    enrolled:filtered.reduce((s,d)=>s+(d.enrolled||0),0),
    paid:filtered.reduce((s,d)=>s+(d.paid||0),0),
    pending:filtered.reduce((s,d)=>s+(d.pending||0),0),
  }),[filtered]);
  const avgPT = useMemo(()=>{
    const pts=filtered.map(d=>parsePT(d.avgPreview)).filter(v=>v!=null);
    if(!pts.length) return null;
    const avg=pts.reduce((a,b)=>a+b,0)/pts.length;
    return `${String(Math.floor(avg/60)).padStart(2,"0")}:${String(Math.round(avg%60)).padStart(2,"0")}`;
  },[filtered]);

  const chartData = filtered.map(d=>({ name:fmtDate(d.date), calls:d.calls, live:aLive(d), cr:d.calls>0?parseFloat((aLive(d)/d.calls*100).toFixed(1)):0, pt:parsePT(d.avgPreview) }));
  const initials = name.split(" ").map(n=>n[0]).join("").slice(0,2);

  return (
    <div>
      <button onClick={onBack} style={{background:"none",border:"none",color:P.blue,fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:font,marginBottom:16,padding:0,display:"flex",alignItems:"center",gap:6}}>
        ← Back to team
      </button>
      <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20}}>
        <div style={{width:44,height:44,borderRadius:"50%",background:P.blueLight,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:700,color:P.blue}}>{initials}</div>
        <div>
          <h2 style={{margin:0,fontSize:18,fontWeight:700,color:P.text}}>{name}</h2>
          <p style={{margin:0,fontSize:12,color:P.textSec}}>Agent performance profile · Provision (Ohio)</p>
        </div>
      </div>
      <DateFilter dateFrom={dateFrom} dateTo={dateTo} setDateFrom={setDateFrom} setDateTo={setDateTo} allDates={allDates}/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
        <Stat label="Total calls" value={fn(totals.calls)} sub={`${filtered.length} days`}/>
        <Stat label="Live contacts" value={fn(totals.live)} sub={totals.calls>0?`${(totals.live/totals.calls*100).toFixed(1)}% connect`:""} accent={P.blue}/>
        <Stat label="Wrong numbers" value={fn(totals.wrong)} sub={totals.calls>0?`${(totals.wrong/totals.calls*100).toFixed(1)}% of calls`:""} accent={P.red}/>
        <Stat label="Revenue earned" value={fmtRev(totals.paid||0)} sub={(totals.pending||0)>0?`+${fmtRev(totals.pending)} pending`:"No pending"} accent={P.green} bg={P.greenLight}/>
        <Stat label="Avg preview AT" value={avgPT||"—"} sub="target: 00:35"/>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20}}>
        <ChartCard title="Daily call volume">
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={chartData} margin={{top:4,right:4,bottom:0,left:-20}}>
              <CartesianGrid strokeDasharray="3 3" stroke={P.grayLight} vertical={false}/>
              <XAxis dataKey="name" tick={{fontSize:9,fill:P.textMuted}} tickLine={false} axisLine={false}/>
              <YAxis tick={{fontSize:9,fill:P.textMuted}} tickLine={false} axisLine={false}/>
              <Tooltip content={<CT/>}/>
              <Bar dataKey="calls" fill={P.blue} radius={[3,3,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Live connect rate %">
          <ResponsiveContainer width="100%" height={140}>
            <AreaChart data={chartData} margin={{top:4,right:4,bottom:0,left:-20}}>
              <CartesianGrid strokeDasharray="3 3" stroke={P.grayLight} vertical={false}/>
              <XAxis dataKey="name" tick={{fontSize:9,fill:P.textMuted}} tickLine={false} axisLine={false}/>
              <YAxis tick={{fontSize:9,fill:P.textMuted}} tickLine={false} axisLine={false}/>
              <Tooltip content={<CT unit="%"/>}/>
              <Area dataKey="cr" stroke={P.green} fill={P.greenLight} strokeWidth={2}/>
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Live contacts (daily)">
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={chartData} margin={{top:4,right:4,bottom:0,left:-20}}>
              <CartesianGrid strokeDasharray="3 3" stroke={P.grayLight} vertical={false}/>
              <XAxis dataKey="name" tick={{fontSize:9,fill:P.textMuted}} tickLine={false} axisLine={false}/>
              <YAxis tick={{fontSize:9,fill:P.textMuted}} tickLine={false} axisLine={false}/>
              <Tooltip content={<CT/>}/>
              <Bar dataKey="live" fill={P.amber} radius={[3,3,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Preview AT (seconds) — 35s target">
          <ResponsiveContainer width="100%" height={140}>
            <LineChart data={chartData} margin={{top:4,right:4,bottom:0,left:-20}}>
              <CartesianGrid strokeDasharray="3 3" stroke={P.grayLight} vertical={false}/>
              <XAxis dataKey="name" tick={{fontSize:9,fill:P.textMuted}} tickLine={false} axisLine={false}/>
              <YAxis tick={{fontSize:9,fill:P.textMuted}} tickLine={false} axisLine={false}/>
              <Tooltip content={<CT unit="s"/>}/>
              <Line dataKey="pt" stroke={P.red} strokeWidth={2} dot={{r:3,fill:P.card,stroke:P.red,strokeWidth:2}} connectNulls/>
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}


export default function App() {
  const [view, setView] = useState("campaign");
  const [cFrom, setCFrom] = useState("");
  const [cTo, setCTo] = useState("");
  const [aFrom, setAFrom] = useState("");
  const [aTo, setATo] = useState("");
  const [lFrom, setLFrom] = useState("");
  const [lTo, setLTo] = useState("");
  const [selAgent, setSelAgent] = useState(null);
  const [lbMetric, setLbMetric] = useState("live");

  const allDates = SEED.map(d=>d.date);

  const filterData = (from, to) => SEED.filter(d=>(!from||d.date>=from)&&(!to||d.date<=to));
  const cData = useMemo(()=>filterData(cFrom,cTo),[cFrom,cTo]);
  const aData = useMemo(()=>filterData(aFrom,aTo).filter(d=>d.agentData.length>0),[aFrom,aTo]);
  const lData = useMemo(()=>filterData(lFrom,lTo).filter(d=>d.agentData.length>0),[lFrom,lTo]);

  const allAgents = useMemo(()=>{const s=new Set();SEED.forEach(d=>d.agentData.forEach(a=>s.add(a.name)));return [...s].sort();},[]);

  const cAgg = useMemo(()=>{
    const a={calls:0,live:0,noAns:0,voicemail:0,wrong:0,dnc:0,enrolled:0,paid:0,pending:0,agents:0};
    cData.forEach(d=>{a.calls+=tc(d);a.live+=lc(d);a.noAns+=d.dispositions.noAns;a.voicemail+=d.dispositions.voicemail;a.wrong+=d.dispositions.wrong;a.dnc+=d.dispositions.dnc;a.enrolled+=(d.enrolled||0);a.paid+=(d.sales?.paid||0);a.pending+=(d.sales?.pending||0);a.agents=Math.max(a.agents,d.agents);});
    return a;
  },[cData]);

  const chartData = useMemo(()=>cData.map(d=>({ name:fmtDate(d.date), calls:tc(d), live:lc(d), cr:cr(d), pt:parsePT(d.timing?.previewAT) })),[cData]);

  const aggAgents = useMemo(()=>{
    const map={};
    aData.forEach(day=>day.agentData.forEach(a=>{
      if(!map[a.name]) map[a.name]={name:a.name,calls:0,live:0,wrong:0,enrolled:0,paid:0,days:0,previewSecs:[]};
      map[a.name].calls+=(a.calls||0);
      map[a.name].live+=aLive(a);
      map[a.name].wrong+=(a.wrong||0);
      map[a.name].enrolled+=(a.enrolled||0);
      map[a.name].paid+=(a.paid||0);
      map[a.name].days++;
      const pt=parsePT(a.avgPreview);
      if(pt!=null) map[a.name].previewSecs.push(pt);
    }));
    return Object.values(map).map(a=>({...a,cr:a.calls>0?parseFloat((a.live/a.calls*100).toFixed(1)):0,avgPT:a.previewSecs.length?Math.round(a.previewSecs.reduce((x,y)=>x+y,0)/a.previewSecs.length):null}));
  },[aData]);

  const leaderboard = useMemo(()=>{
    const map={};
    lData.forEach(day=>day.agentData.forEach(a=>{
      if(!map[a.name]) map[a.name]={name:a.name,calls:0,live:0,enrolled:0,paid:0};
      map[a.name].calls+=(a.calls||0);
      map[a.name].live+=aLive(a);
      map[a.name].enrolled+=(a.enrolled||0);
      map[a.name].paid+=(a.paid||0);
    }));
    const arr=Object.values(map).map(a=>({...a,cr:a.calls>0?parseFloat((a.live/a.calls*100).toFixed(1)):0}));
    const key=lbMetric==="calls"?"calls":lbMetric==="live"?"live":lbMetric==="connect"?"cr":lbMetric==="enrolled"?"enrolled":"paid";
    return arr.sort((a,b)=>parseFloat(b[key])-parseFloat(a[key]));
  },[lData,lbMetric]);

  const tab=(a)=>({padding:"8px 20px",borderRadius:9,border:"none",background:a?P.blue:"transparent",color:a?"#fff":P.textSec,fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:font,transition:"all .15s"});
  const fbtn=(a)=>({padding:"5px 13px",borderRadius:8,border:a?`1.5px solid ${P.blue}`:`1px solid ${P.grayLight}`,background:a?P.blueLight:P.card,color:a?P.blue:P.textSec,fontWeight:a?600:400,fontSize:12,cursor:"pointer",fontFamily:font});

  const avatarColors = ["#E6F1FB:#185FA5","#E6FAF4:#0F6E56","#FFF8EB:#854F0B","#FFF0F1:#A32D2D","#EEEDFE:#534AB7"];
  const av = (name,i) => { const [bg,cl]=avatarColors[i%5].split(":"); return <div style={{width:34,height:34,borderRadius:"50%",background:bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:cl,flexShrink:0}}>{name.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>; };

  return (
    <div style={{fontFamily:font,background:P.bg,minHeight:"100vh",padding:"24px"}}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet"/>

      {/* Header */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <div style={{height:40,display:"flex",alignItems:"center",background:P.blue,borderRadius:8,padding:"0 12px"}}><span style={{color:"white",fontWeight:700,fontSize:16,letterSpacing:".05em"}}>APPOYNT</span></div>
          <div>
            <h1 style={{margin:0,fontSize:20,fontWeight:700,color:P.text}}>Provision Campaign</h1>
            <p style={{margin:0,fontSize:12,color:P.textSec}}>Ohio Outbound Sales Dashboard</p>
          </div>
        </div>
        <div style={{fontSize:11,color:P.textMuted}}>Last updated: {fmtDateFull(SEED[SEED.length-1].date)}</div>
      </div>

      {/* Tabs */}
      <div style={{display:"flex",gap:5,marginBottom:20,background:P.card,borderRadius:12,padding:4,width:"fit-content",border:`1px solid ${P.grayLight}`}}>
        {[["campaign","Campaign"],["agent","Agents"],["leaderboard","Leaderboard"]].map(([k,l])=>(
          <button key={k} style={tab(view===k)} onClick={()=>{setView(k);setSelAgent(null);}}>{l}</button>
        ))}
      </div>

      {/* ══ CAMPAIGN ══ */}
      {view==="campaign" && (
        <div>
          <DateFilter dateFrom={cFrom} dateTo={cTo} setDateFrom={setCFrom} setDateTo={setCTo} allDates={allDates}/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:12,marginBottom:20}}>
            <Stat label="Total calls" value={fn(cAgg.calls)} sub={`${cData.length} days · ${cAgg.agents} agents`}/>
            <Stat label="Live contacts" value={fn(cAgg.live)} sub={cAgg.calls>0?`${(cAgg.live/cAgg.calls*100).toFixed(1)}% connect rate`:"—"} accent={P.blue}/>
            <Stat label="No answer" value={fn(cAgg.noAns)} sub={fp(cAgg.noAns,cAgg.calls)} accent={P.amber} bg={P.amberLight}/>
            <Stat label="Voicemail" value={fn(cAgg.voicemail)} sub={fp(cAgg.voicemail,cAgg.calls)}/>
            <Stat label="Wrong numbers" value={fn(cAgg.wrong)} sub={fp(cAgg.wrong,cAgg.calls)} accent={P.red} bg={P.redLight}/>
            <Stat label="DNC" value={fn(cAgg.dnc)} sub={fp(cAgg.dnc,cAgg.calls)} accent={P.red}/>
            <Stat label="Enrolled" value={fn(cAgg.enrolled)} sub="total enrolments"/>
            <Stat label="Revenue earned" value={fmtRev(cAgg.paid)} sub={cAgg.pending>0?`+${fmtRev(cAgg.pending)} pending`:"No pending"} accent={P.green} bg={P.greenLight}/>
          </div>
          {cData.length>1 && (
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:20}}>
              <ChartCard title="Daily call volume">
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={chartData} margin={{top:4,right:4,bottom:0,left:-20}}>
                    <CartesianGrid strokeDasharray="3 3" stroke={P.grayLight} vertical={false}/>
                    <XAxis dataKey="name" tick={{fontSize:9,fill:P.textMuted}} tickLine={false} axisLine={false}/>
                    <YAxis tick={{fontSize:9,fill:P.textMuted}} tickLine={false} axisLine={false}/>
                    <Tooltip content={<CT/>}/>
                    <Bar dataKey="calls" fill={P.blue} radius={[3,3,0,0]}/>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
              <ChartCard title="Live connect rate %">
                <ResponsiveContainer width="100%" height={150}>
                  <AreaChart data={chartData} margin={{top:4,right:4,bottom:0,left:-20}}>
                    <CartesianGrid strokeDasharray="3 3" stroke={P.grayLight} vertical={false}/>
                    <XAxis dataKey="name" tick={{fontSize:9,fill:P.textMuted}} tickLine={false} axisLine={false}/>
                    <YAxis tick={{fontSize:9,fill:P.textMuted}} tickLine={false} axisLine={false}/>
                    <Tooltip content={<CT unit="%"/>}/>
                    <Area dataKey="cr" stroke={P.green} fill={P.greenLight} strokeWidth={2}/>
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>
              <ChartCard title="Live contacts (daily)">
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={chartData} margin={{top:4,right:4,bottom:0,left:-20}}>
                    <CartesianGrid strokeDasharray="3 3" stroke={P.grayLight} vertical={false}/>
                    <XAxis dataKey="name" tick={{fontSize:9,fill:P.textMuted}} tickLine={false} axisLine={false}/>
                    <YAxis tick={{fontSize:9,fill:P.textMuted}} tickLine={false} axisLine={false}/>
                    <Tooltip content={<CT/>}/>
                    <Bar dataKey="live" fill={P.amber} radius={[3,3,0,0]}/>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
              <ChartCard title="Preview AT trend (seconds) — 35s target">
                <ResponsiveContainer width="100%" height={150}>
                  <LineChart data={chartData} margin={{top:4,right:4,bottom:0,left:-20}}>
                    <CartesianGrid strokeDasharray="3 3" stroke={P.grayLight} vertical={false}/>
                    <XAxis dataKey="name" tick={{fontSize:9,fill:P.textMuted}} tickLine={false} axisLine={false}/>
                    <YAxis tick={{fontSize:9,fill:P.textMuted}} tickLine={false} axisLine={false}/>
                    <Tooltip content={<CT unit="s"/>}/>
                    <Line dataKey="pt" stroke={P.red} strokeWidth={2} dot={{r:3,fill:P.card,stroke:P.red,strokeWidth:2}} connectNulls/>
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            </div>
          )}
          <WeeklyTable filtered={cData}/>
        </div>
      )}

      {/* ══ AGENTS ══ */}
      {view==="agent" && (
        selAgent
          ? <AgentProfile name={selAgent} onBack={()=>setSelAgent(null)} allData={SEED}/>
          : <div>
            <DateFilter dateFrom={aFrom} dateTo={aTo} setDateFrom={setAFrom} setDateTo={setATo} allDates={SEED.filter(d=>d.agentData.length>0).map(d=>d.date)}/>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:12,marginBottom:20}}>
              {aggAgents.map((a,i)=>(
                <div key={a.name} onClick={()=>setSelAgent(a.name)} style={{background:P.card,border:`1px solid ${P.grayLight}`,borderRadius:14,padding:"16px 18px",cursor:"pointer",transition:"box-shadow .15s"}} onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 16px rgba(59,125,221,.12)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                    {av(a.name,i)}
                    <p style={{margin:0,fontSize:13,fontWeight:600,color:P.text}}>{a.name}</p>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                    <div><span style={{fontSize:10,color:P.textMuted,display:"block"}}>Calls</span><span style={{fontSize:17,fontWeight:700,color:P.text}}>{fn(a.calls)}</span></div>
                    <div><span style={{fontSize:10,color:P.textMuted,display:"block"}}>Live</span><span style={{fontSize:17,fontWeight:700,color:P.blue}}>{fn(a.live)}</span></div>
                    <div><span style={{fontSize:10,color:P.textMuted,display:"block"}}>Connect</span><span style={{fontSize:13,fontWeight:600,color:P.green}}>{a.cr}%</span></div>
                    <div><span style={{fontSize:10,color:P.textMuted,display:"block"}}>Preview AT</span><span style={{fontSize:13,fontWeight:600,color:P.text}}>{a.avgPT?`${String(Math.floor(a.avgPT/60)).padStart(2,"0")}:${String(a.avgPT%60).padStart(2,"0")}`:"—"}</span></div>
                  </div>
                  <p style={{margin:"12px 0 0",fontSize:11,color:P.blue,fontWeight:500}}>View profile →</p>
                </div>
              ))}
            </div>
            <div style={{background:P.card,border:`1px solid ${P.grayLight}`,borderRadius:14,padding:"18px 20px",overflowX:"auto"}}>
              <p style={{margin:"0 0 14px",fontSize:11,fontWeight:600,color:P.textMuted,textTransform:"uppercase",letterSpacing:".04em"}}>Team comparison — selected period</p>
              <table style={{width:"100%",borderCollapse:"collapse",fontSize:12}}>
                <thead><tr>
                  {["Agent","Calls","Live","Connect%","Wrong#","DNC","Expired","Enrolled","Revenue","Avg Preview AT"].map((h,i)=>(
                    <th key={h} style={{textAlign:i===0?"left":"center",padding:"9px 8px",fontSize:10.5,fontWeight:600,color:P.textMuted,textTransform:"uppercase",letterSpacing:".04em",borderBottom:`2px solid ${P.grayLight}`,whiteSpace:"nowrap"}}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>{aggAgents.map((a,i)=>(
                  <tr key={a.name} style={{borderBottom:`1px solid ${P.grayLight}`,background:i%2?P.bg:"transparent",cursor:"pointer"}} onClick={()=>setSelAgent(a.name)}>
                    <td style={{padding:"10px 8px",fontWeight:500,color:P.blue,whiteSpace:"nowrap"}}>{a.name}</td>
                    <td style={{textAlign:"center",padding:"10px 8px",fontWeight:600}}>{fn(a.calls)}</td>
                    <td style={{textAlign:"center",padding:"10px 8px",fontWeight:600,color:P.blue}}>{fn(a.live)}</td>
                    <td style={{textAlign:"center",padding:"10px 8px",fontWeight:600,color:P.green}}>{a.cr}%</td>
                    <td style={{textAlign:"center",padding:"10px 8px",color:a.calls>0&&a.wrong/a.calls>.1?P.red:P.text}}>{fn(a.wrong)}</td>
                    <td style={{textAlign:"center",padding:"10px 8px",color:P.text}}>{fn(a.dnc||0)}</td>
                    <td style={{textAlign:"center",padding:"10px 8px",color:P.text}}>{fn(aggAgents.find(x=>x.name===a.name)?.enrolled||0)}</td>
                    <td style={{textAlign:"center",padding:"10px 8px"}}>{fn(a.enrolled)}</td>
                    <td style={{textAlign:"center",padding:"10px 8px",fontWeight:500,color:P.green}}>{fmtRev(a.paid||0)}</td>
                    <td style={{textAlign:"center",padding:"10px 8px",color:P.text}}>{a.avgPT?`${String(Math.floor(a.avgPT/60)).padStart(2,"0")}:${String(a.avgPT%60).padStart(2,"0")}`:"—"}</td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </div>
      )}

      {/* ══ LEADERBOARD ══ */}
      {view==="leaderboard" && (
        <div>
          <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:16,flexWrap:"wrap"}}>
            <DateFilter dateFrom={lFrom} dateTo={lTo} setDateFrom={setLFrom} setDateTo={setLTo} allDates={SEED.filter(d=>d.agentData.length>0).map(d=>d.date)}/>
          </div>
          <div style={{display:"flex",gap:7,alignItems:"center",marginBottom:16,flexWrap:"wrap"}}>
            <span style={{fontSize:12,color:P.textSec,fontWeight:500}}>Rank by</span>
            {[["calls","Total calls"],["live","Live contacts"],["connect","Connect %"],["enrolled","Enrolled"],["revenue","Revenue"]].map(([k,l])=>(
              <button key={k} style={fbtn(lbMetric===k)} onClick={()=>setLbMetric(k)}>{l}</button>
            ))}
          </div>
          {leaderboard.length===0
            ? <div style={{background:P.card,borderRadius:14,padding:48,textAlign:"center",color:P.textMuted}}>No agent data available.</div>
            : <div style={{display:"grid",gap:10}}>
              {leaderboard.map((a,i)=>{
                const medal=i===0?"🥇":i===1?"🥈":i===2?"🥉":"";
                const metricVal=lbMetric==="calls"?fn(a.calls):lbMetric==="live"?fn(a.live):lbMetric==="connect"?a.cr+"%":lbMetric==="enrolled"?fn(a.enrolled):fmtRev(a.paid||0);
                const barMax=leaderboard[0]?parseFloat(lbMetric==="calls"?leaderboard[0].calls:lbMetric==="live"?leaderboard[0].live:lbMetric==="connect"?leaderboard[0].cr:lbMetric==="enrolled"?leaderboard[0].enrolled:(leaderboard[0].paid||0)*100):1;
                const barVal=parseFloat(lbMetric==="calls"?a.calls:lbMetric==="live"?a.live:lbMetric==="connect"?a.cr:lbMetric==="enrolled"?a.enrolled:(a.paid||0)*100);
                const barPct=barMax>0?(barVal/barMax)*100:0;
                const barColor=i===0?P.blue:i===1?P.green:P.amber;
                return (
                  <div key={a.name} onClick={()=>{setView("agent");setSelAgent(a.name);}} style={{background:P.card,border:`1px solid ${P.grayLight}`,borderRadius:14,padding:"14px 20px",cursor:"pointer",display:"flex",alignItems:"center",gap:14,transition:"box-shadow .15s"}} onMouseEnter={e=>e.currentTarget.style.boxShadow="0 4px 16px rgba(59,125,221,.12)"} onMouseLeave={e=>e.currentTarget.style.boxShadow="none"}>
                    <div style={{fontSize:20,width:30,textAlign:"center"}}>{medal||<span style={{fontSize:14,fontWeight:600,color:P.textMuted}}>#{i+1}</span>}</div>
                    {av(a.name,i)}
                    <div style={{flex:"0 0 150px"}}>
                      <p style={{margin:0,fontSize:14,fontWeight:600,color:P.text}}>{a.name}</p>
                      <p style={{margin:"2px 0 0",fontSize:11,color:P.textSec}}>{fn(a.calls)} calls · {a.cr}% connect</p>
                    </div>
                    <div style={{flex:1,display:"flex",alignItems:"center",gap:12}}>
                      <div style={{flex:1,height:10,background:P.grayLight,borderRadius:6,overflow:"hidden"}}>
                        <div style={{width:`${barPct}%`,height:"100%",background:barColor,borderRadius:6,transition:"width .3s"}}/>
                      </div>
                      <span style={{fontSize:16,fontWeight:700,color:P.text,minWidth:60,textAlign:"right"}}>{metricVal}</span>
                    </div>
                    <span style={{fontSize:11,color:P.blue,fontWeight:500}}>Profile →</span>
                  </div>
                );
              })}
            </div>
          }
        </div>
      )}

      <div style={{marginTop:32,paddingTop:16,borderTop:`1px solid ${P.grayLight}`,display:"flex",justifyContent:"space-between",fontSize:10.5,color:P.textMuted}}>
        <span>Appoynt · Provision (Ohio)</span>
        <span>Source: NobelBiz dialler · Provision sales reports</span>
      </div>
    </div>
  );
}
