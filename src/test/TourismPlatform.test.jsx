import { describe, test, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import TourismPlatform from '../pages/ToursimPlatform'

// Mock child components
vi.mock('../components/GuideApplicationForm', () => ({
  default: ({ onSubmit }) => {
    // Create mock submission
    const handleSubmit = (e) => {
      // Simulate preventDefault if event exists
      if (e && typeof e.preventDefault === 'function') {
        e.preventDefault();
      }
      
      // Call onSubmit with mock data
      onSubmit({
        target: {
          name: { value: "John Doe" },
          experience: { value: "5" },
          languages: { value: "English" },
          description: { value: "Experienced guide" },
          exampleTourTitle: { value: "City Tour" },
          exampleTourLocation: { value: "Downtown" },
          exampleTourDuration: { value: "3" },
          exampleTourDescription: { value: "Exciting city tour" },
          reset: () => {} // Add a reset method
        }
      });
    };

    return (
      <form 
        data-testid="guide-form"
        onSubmit={handleSubmit}
      >
        <button type="submit">Submit Guide Application</button>
      </form>
    )
  }
}))

vi.mock('../components/CarRentalForm', () => ({
  default: ({ onSubmit }) => {
    // Create a mock submit 
    const handleSubmit = (e) => {
      // Simulate preventDefault if event exists
      if (e && typeof e.preventDefault === 'function') {
        e.preventDefault();
      }
      
      // Call onSubmit with mock data
      onSubmit({
        name: "Jane Doe",
        date: "2024-07-15",
        carType: "SUV",
        carName: "Toyota RAV4",
        duration: 3
      });
    };

    return (
      <form
        data-testid="car-form"
        onSubmit={handleSubmit}
      >
        <button type="submit">Book Car</button>
      </form>
    )
  }
}))

vi.mock('../components/AdminDashboard', () => ({
  default: ({ applications }) => (
    <div data-testid="admin-dashboard">
      {applications?.map(app => (
        <div key={app.id} data-testid="application-item">
          {app.name}
        </div>
      ))}
    </div>
  )
}))

describe('TourismPlatform', () => {
  // Clear mocks before each test
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders guide application tab by default', () => {
    render(<TourismPlatform />)
    expect(screen.getByTestId('guide-form')).toBeInTheDocument()
  })

  it('can switch between tabs', async () => {
    render(<TourismPlatform />)

    // Check guide form is visible initially
    expect(screen.getByTestId('guide-form')).toBeInTheDocument()

    // Switch to car rental
    fireEvent.click(screen.getByText('Car Rental'))
    await waitFor(() => {
      expect(screen.getByTestId('car-form')).toBeInTheDocument()
    })

    // Switch back to guide
    fireEvent.click(screen.getByText('Local Guide Application'))
    await waitFor(() => {
      expect(screen.getByTestId('guide-form')).toBeInTheDocument()
    })
  })

  it('submits car booking successfully', async () => {
    render(<TourismPlatform />)

    // Switch to car rental tab
    fireEvent.click(screen.getByText('Car Rental'))

    // Submit booking
    const form = screen.getByTestId('car-form')
    fireEvent.submit(form)

    // Wait for and verify booking details
    await waitFor(() => {
      expect(screen.getByText(/Jane Doe/)).toBeInTheDocument()
    })
  })

  it('submits guide application successfully', async () => {
    render(<TourismPlatform />)

    // Submit guide application
    const form = screen.getByTestId('guide-form')
    fireEvent.submit(form)

    // Wait for and verify application details
    await waitFor(() => {
      expect(screen.getByTestId('admin-dashboard')).toBeInTheDocument()
      expect(screen.getByTestId('application-item')).toBeInTheDocument()
      expect(screen.getByText(/John Doe/)).toBeInTheDocument()
    })
  })
})