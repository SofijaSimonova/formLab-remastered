import type { ReferenceResponse } from '../types/exercise.types'

interface BodyExplorerProps {
    bodyParts: ReferenceResponse[]
    selectedBodyPartId: string | null
    onSelectBodyPart: (bodyPartId: string) => void
}

export function BodyExplorer({
                                 bodyParts,
                                 selectedBodyPartId,
                                 onSelectBodyPart,
                             }: BodyExplorerProps) {
    return (
        <aside className="body-explorer">
            <div className="body-explorer-header">
                <span>BODY EXPLORER</span>

                <div className="body-explorer-view-toggle">
                    <button type="button" className="active">
                        Front
                    </button>

                    <button type="button">
                        Back
                    </button>
                </div>
            </div>

            <div className="body-explorer-model">
                <div className="body-explorer-placeholder">
                    <span>3D BODY MODEL</span>

                    {bodyParts.map((bodyPart) => (
                        <button
                            key={bodyPart.id}
                            type="button"
                            className={`body-part-point ${
                                selectedBodyPartId === bodyPart.id
                                    ? 'selected'
                                    : ''
                            }`}
                            onClick={() =>
                                onSelectBodyPart(bodyPart.id)
                            }
                        >
                            <span />
                            <small>{bodyPart.name}</small>
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    )
}