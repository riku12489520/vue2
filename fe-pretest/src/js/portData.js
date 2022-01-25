var json = [
      // PCMID 1 冰箱
      { name: '冰箱A 制冷'
      , pcm_id: '1'
      , dev_id: 'dev_1011' },
      // 數值範圍0-1，單位: 0 = OFF, 1 = ON
      { name: '冰箱A 冷凍庫溫度'
      , pcm_id: '1'
      , dev_id: 'dev_1012' },
      // 數值範圍-50~5，單位: °C
      { name: '冰箱A 微壓差'
      , pcm_id: '1'
      , dev_id: 'dev_1013' },
      // 數值範圍0.01-100.99，單位: pa
      { name: '冰箱B 制冷'
      , pcm_id: '1'
      , dev_id: 'dev_1021' },
      // 數值範圍0-1，單位: 0 = OFF, 1 = ON
      { name: '冰箱B 冷凍庫溫度'
      , pcm_id: '1'
      , dev_id: 'dev_1022' },
      // 數值範圍-50~5，單位: °C
      { name: '冰箱B 微壓差'
      , pcm_id: '1'
      , dev_id: 'dev_1023' },
      // 數值範圍0.01-100.99，單位: pa
      // PCMID 2 包裝
      { name: '包裝A線 啟動'
      , pcm_id: '2'
      , dev_id: 'dev_2011' },
      // 數值範圍0-1，單位: 0 = OFF, 1 = ON
      // PCMID 3 倉庫
      { name: 'A區 庫存量比例'
      , pcm_id: '3'
      , dev_id: 'dev_3011' },
      // 數值範圍-0~100，單位: %
      { name: 'B區 庫存量比例'
      , pcm_id: '3'
      , dev_id: 'dev_3021' },
      // 數值範圍-0~100，單位: %
    ];
    export default json;