const blocksMock = [
  {
    bits: 390462291,
    block_index: 1699057,
    fee: 12046407,
    hash: '0000000000000000003502a5ceea515ebe040ba503a2b2b03c6b1fff1aeb51c3',
    height: 520506,
    main_chain: true,
    mrkl_root: '864f639a826bd8d1596dd47ba685630fbd5e1f5a1d87e6521cbfc1aee6db7494',
    n_tx: 789,
    nonce: 1540332728,
    prev_block: '000000000000000000374b38fe44becc57e2d587e12f60dfd994ae0a5a9736be',
    received_time: 1525054432,
    relayed_by: '0.0.0.0',
    size: 437935,
    time: 1525054432,
    ver: 536870912,
    tx: [
      {
        hash: 'b84fa837a0cc510081ea22d3273f1b1d6646aa61577a1087ba7bb442d1784bb9',
        lock_time: 0,
        relayed_by: '0.0.0.0',
        size: 253,
        time: 1525054432,
        tx_index: 345118065,
        ver: 1,
        vin_sz: 1,
        vout_sz: 2,
        weight: 904,
        inputs: [
          {
            script:
              '033af10741d6b99eeef2d23441d6b99eee2c8d5c2f4254432e544f502ffabe6d6d5c275d963ece1996bd090cd03687fe35b0881f59d0608e8f5a10539855ede7008000000000000000d80079c5f7abaa2a00000000',
            sequence: 4294967295,
            witness: '01200000000000000000000000000000000000000000000000000000000000000000'
          }
        ],
        out: [
          {
            addr: '1Hz96kJKF2HLPGY15JWLB5m9qGNxvt8tHJ',
            n: 0,
            script: '76a914ba507bae8f1643d2556000ca26b9301b9069dc6b88ac',
            spent: false,
            tx_index: 345118065,
            type: 0,
            value: 1262046407
          },
          {
            n: 1,
            script: '6a24aa21a9ed540403ff454e89457d3c095c5b891774b56b5a7cbda7f39930f59293cb50226a',
            spent: false,
            tx_index: 345118065,
            type: 0,
            value: 0
          }
        ]
      }
    ]
  }
];

export default blocksMock;
