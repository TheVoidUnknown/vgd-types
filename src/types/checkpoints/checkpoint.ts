import { Uuid, Vector2d } from '../common';

/**
 * Represents a checkpoint in a level.
 * When a player reaches the specified timestamp, this checkpoint is activated. If the player
 * subsequently dies, they will respawn at this checkpoint's position and time.
 * @interface Checkpoint
 */
export interface Checkpoint {
  /**
   * The immutable identifier for this checkpoint.
   * @property {Uuid} id
   * @see {@link Uuid}
   */
  id: Uuid;

  /**
   * The display name for the checkpoint in-editor.
   * @property {string} name
   */
  name?: string;

  /**
   * The position where the player will respawn. This property is optional.
   * @property {Vector2d} [placement]
   * @see {@link Vector2d}
   */
  placement?: Vector2d;

  /**
   * The in-game timestamp (in seconds) that the player
   * must reach to activate this checkpoint. This property is optional.
   * @property {number} [timestamp]
   */
  timestamp?: number;
}

export function serializeCheckpointsSync(checkpoints: Checkpoint[]) {
  const object: Array<any> = [];

  for (const checkpoint of checkpoints) {
    object.push({
      ...(checkpoint.id !== undefined && { ID: checkpoint.id }),
      ...(checkpoint.name !== undefined && { n: checkpoint.name }),
      ...(checkpoint.placement !== undefined && { p: checkpoint.placement }),
      ...(checkpoint.timestamp !== undefined && { t: checkpoint.timestamp })
    })
  }

  return object;
}

export function deserializeCheckpointsSync(checkpoints: Array<any>): Checkpoint[] {
  const object: Checkpoint[] = [];

  for(const checkpoint of checkpoints) {
    object.push({
      id: checkpoint.ID,
      name: checkpoint.n,
      placement: checkpoint?.p,
      timestamp: checkpoint?.t
    })
  }

  return object;
}