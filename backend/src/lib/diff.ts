import { createHash } from 'crypto';
import { tEditorData } from './types';

function hashBlock(block: { type: string; data: { text: string; level: number } }): string {
    return createHash('sha256')
        .update(block.type + block.data.text + block.data.level)
        .digest('hex');
}

export function calculateEditorDiffWithHash(
    prev: Omit<tEditorData, "time">,
    next: Omit<tEditorData, "time">
): { diff: Partial<tEditorData>; hasChanges: boolean } {
    const diff: Partial<tEditorData> = { blocks: [] };
    let hasChanges = false;

    // Check if block lengths differ
    if (prev.blocks.length !== next.blocks.length) {
        hasChanges = true;
        diff.blocks = next.blocks; // Entire block is different
    } else {
        // Compute hashes for faster comparison
        const prevHashes = prev.blocks.map(hashBlock);
        const nextHashes = next.blocks.map(hashBlock);

        for (let i = 0; i < prevHashes.length; i++) {
            if (prevHashes[i] !== nextHashes[i]) {
                hasChanges = true;
                diff.blocks!.push(next.blocks[i]); // Push changed block
            } else {
                diff.blocks!.push(); // No change for this block
            }
        }
    }

    // If no changes, clear the diff
    if (!hasChanges) {
        delete diff.blocks;
    }

    return { diff, hasChanges };
}
