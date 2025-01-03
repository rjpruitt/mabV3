'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { StepLayout } from './StepLayout'
import { Step, StepId, ProjectType } from './types'
import { useDesignStorage } from '../storage/useDesignStorage'
import { useLeadCapture } from '../lead-capture/useLeadCapture'
import { LeadCaptureModal } from '../lead-capture/LeadCaptureModal'
import { ProjectTypeStep } from './project-type/ProjectTypeStep'
import { ShapeStep } from './shape/ShapeStep'
import { PlumbingStep } from './plumbing/PlumbingStep'
import { BaseStep } from './base/BaseStep'
import { WallStep } from './walls/WallStep'
import { FixturesStep } from './fixtures/FixturesStep'
import { AccessoriesStep } from './accessories/AccessoriesStep'
import { ReviewStep } from './review/ReviewStep'
import type { FixtureCategory } from './fixtures/FixturesStep'

const STEPS: Step[] = [
  {
    id: 'project-type',
    title: 'Project Type',
    description: 'What type of project are you planning?',
    isComplete: false
  },
  {
    id: 'shape',
    title: 'Shape & Size',
    description: 'Select the shape and size of your shower',
    isComplete: false
  },
  {
    id: 'plumbing',
    title: 'Plumbing Location',
    description: 'Indicate where your plumbing connections are located',
    isComplete: false
  },
  {
    id: 'base',
    title: 'Shower Base',
    description: 'Choose your perfect shower base',
    isComplete: false
  },
  {
    id: 'walls',
    title: 'Wall System',
    description: 'Select your wall system and design',
    isComplete: false
  },
  {
    id: 'fixtures',
    title: 'Fixtures',
    description: 'Choose your shower fixtures and controls',
    isComplete: false
  },
  {
    id: 'accessories',
    title: 'Accessories',
    description: 'Add storage, safety features, and other accessories',
    isComplete: false
  },
  {
    id: 'review',
    title: 'Review',
    description: 'Review your selections and get your estimate',
    isComplete: false
  }
]

export function CustomDesign() {
  const router = useRouter()
  const [currentStepId, setCurrentStepId] = useState<StepId>('project-type')
  const [steps, setSteps] = useState<Step[]>(STEPS)
  const { currentDesign, updateDesign } = useDesignStorage()
  const {
    isLeadCaptureOpen,
    leadCaptureTrigger,
    openLeadCapture,
    closeLeadCapture,
    handleLeadCapture
  } = useLeadCapture()
  const [projectType, setProjectType] = useState<ProjectType>()
  const [selectedShape, setSelectedShape] = useState<string>()
  const [selectedPlumbing, setSelectedPlumbing] = useState<string>()
  const [selectedBase, setSelectedBase] = useState<string>()
  const [selectedWall, setSelectedWall] = useState<string>()
  const [selectedPattern, setSelectedPattern] = useState<string>()
  const [selectedFixtures, setSelectedFixtures] = useState<Partial<Record<FixtureCategory, string>>>({})
  const [selectedAccessories, setSelectedAccessories] = useState<Record<string, boolean>>({})

  // Handle step navigation
  const handleNext = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStepId)
    if (currentIndex < steps.length - 1) {
      // Mark current step complete
      const updatedSteps = steps.map((step, index) => 
        index === currentIndex ? { ...step, isComplete: true } : step
      )
      setSteps(updatedSteps)
      // Move to next step
      setCurrentStepId(steps[currentIndex + 1].id)
    } else {
      // On last step, trigger lead capture
      openLeadCapture('get-price')
    }
  }

  const handleBack = () => {
    const currentIndex = steps.findIndex(step => step.id === currentStepId)
    if (currentIndex > 0) {
      setCurrentStepId(steps[currentIndex - 1].id)
    } else {
      // If on first step, go back to entry
      router.push('/design-your-shower')
    }
  }

  const handleSave = () => {
    openLeadCapture('save-design')
  }

  const handleEditStep = (stepId: string) => {
    setCurrentStepId(stepId as StepId)
    // Update steps array to mark later steps as incomplete
    const stepIndex = steps.findIndex(s => s.id === stepId)
    const updatedSteps = steps.map((step, index) => ({
      ...step,
      isComplete: index < stepIndex
    }))
    setSteps(updatedSteps)
  }

  const currentStep = steps.find(step => step.id === currentStepId)!

  const renderStepContent = () => {
    switch (currentStepId) {
      case 'project-type':
        return (
          <ProjectTypeStep
            onNext={handleNext}
            onBack={handleBack}
            onSelect={setProjectType}
            selectedType={projectType}
          />
        )
      case 'shape':
        return (
          <ShapeStep
            onNext={handleNext}
            onBack={handleBack}
            onSelect={setSelectedShape}
            selectedShapeId={selectedShape}
          />
        )
      case 'plumbing':
        return (
          <PlumbingStep
            onNext={handleNext}
            onBack={handleBack}
            onSelect={setSelectedPlumbing}
            selectedPlumbingId={selectedPlumbing}
          />
        )
      case 'base':
        return (
          <BaseStep
            onNext={handleNext}
            onBack={handleBack}
            onSelect={setSelectedBase}
            selectedBaseId={selectedBase}
          />
        )
      case 'walls':
        return (
          <WallStep
            onNext={handleNext}
            onBack={handleBack}
            onSelect={(wallId, patternId) => {
              setSelectedWall(wallId)
              setSelectedPattern(patternId)
            }}
            selectedWallId={selectedWall}
            selectedPatternId={selectedPattern}
          />
        )
      case 'fixtures':
        return (
          <FixturesStep
            onNext={handleNext}
            onBack={handleBack}
            onSelect={setSelectedFixtures}
            selectedFixtures={selectedFixtures}
          />
        )
      case 'accessories':
        return (
          <AccessoriesStep
            onNext={handleNext}
            onBack={handleBack}
            onSelect={setSelectedAccessories}
            selectedAccessories={selectedAccessories}
          />
        )
      case 'review':
        return (
          <ReviewStep
            onNext={handleNext}
            onBack={handleBack}
            onEditStep={handleEditStep}
          />
        )
      default:
        return <p>Step Content for: {currentStepId}</p>
    }
  }

  return (
    <>
      <StepLayout
        steps={steps}
        currentStep={currentStep}
        onNext={handleNext}
        onBack={handleBack}
        onSave={handleSave}
      >
        <div className="min-h-[400px]">
          {renderStepContent()}
        </div>
      </StepLayout>

      <LeadCaptureModal
        isOpen={isLeadCaptureOpen}
        onClose={closeLeadCapture}
        onSubmit={handleLeadCapture}
        trigger={leadCaptureTrigger}
      />
    </>
  )
} 