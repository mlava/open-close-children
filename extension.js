export default {
    onload: ({ extensionAPI }) => {
        window.roamAlphaAPI.ui.commandPalette.addCommand({
            label: "Open Block Children",
            callback: () => openChildren(),
        });
        window.roamAlphaAPI.ui.commandPalette.addCommand({
            label: "Close Block Children",
            callback: () => closeChildren(),
        });

        async function openChildren() {
            const startBlock = await window.roamAlphaAPI.ui.getFocusedBlock()?.["block-uid"];
            let q = `[:find (pull ?page
                [:node/title :block/string :block/uid :block/heading :block/props 
                 :entity/attrs :block/open :block/text-align :children/view-type
                 :block/order
                ])
             :where [?page :block/uid "${startBlock}"]  ]`;
            var thisBlockInfo = await window.roamAlphaAPI.q(q);
            var thisBlockInfoString = thisBlockInfo[0][0].string;
            await window.roamAlphaAPI.updateBlock(
                {	block: { uid: startBlock, string: thisBlockInfoString.toString(), open: true } });
        };
        async function closeChildren() {
            const startBlock = await window.roamAlphaAPI.ui.getFocusedBlock()?.["block-uid"];
            let q = `[:find (pull ?page
                [:node/title :block/string :block/uid :block/heading :block/props 
                 :entity/attrs :block/open :block/text-align :children/view-type
                 :block/order
                ])
             :where [?page :block/uid "${startBlock}"]  ]`;
            var thisBlockInfo = await window.roamAlphaAPI.q(q);
            var thisBlockInfoString = thisBlockInfo[0][0].string;
            await window.roamAlphaAPI.updateBlock(
                {	block: { uid: startBlock, string: thisBlockInfoString.toString(), open: false } });
        };
    },
    onunload: () => {
        window.roamAlphaAPI.ui.commandPalette.removeCommand({
            label: 'Open Block Children'
        });
        window.roamAlphaAPI.ui.commandPalette.removeCommand({
            label: 'Close Block Children'
        });
    }
}