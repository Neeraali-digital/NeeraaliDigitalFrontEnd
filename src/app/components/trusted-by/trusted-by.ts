import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CardPosition {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  width: string;
  height: string;
  rotate: string;
  zIndex: number;
  animated?: boolean;
}

@Component({
  selector: 'app-trusted-by',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trusted-by.html',
  styleUrl: './trusted-by.scss'
})
export class TrustedBy implements OnInit, OnDestroy {
  logos = [
    "../../../assets/logos/l1.jpeg",
    "../../../assets/logos/l2.jpeg",
    "../../../assets/logos/l3.jpeg",
    "../../../assets/logos/l4.jpeg",
    "../../../assets/logos/l5.jpeg",
    "../../../assets/logos/l6.jpeg",
    "../../../assets/logos/l7.jpeg",
    
  ];

  // Arc pattern - only top and sides, NO bottom cards
  allCardPositions: CardPosition[] = [
    // TOP LEFT ARC (2 cards - initially visible)
    { top: '8%', left: '8%', width: '200px', height: '160px', rotate: '-15deg', zIndex: 2, animated: false },
    { top: '5%', left: '18%', width: '190px', height: '150px', rotate: '-8deg', zIndex: 3, animated: false },
    
    // TOP (3 cards - initially visible)
    { top: '2%', left: '32%', width: '210px', height: '170px', rotate: '-3deg', zIndex: 1, animated: false },
    { top: '1%', left: '45%', width: '205px', height: '165px', rotate: '0deg', zIndex: 2, animated: false },
    { top: '2%', right: '32%', width: '200px', height: '160px', rotate: '3deg', zIndex: 1, animated: false },
    
    // TOP RIGHT ARC (2 cards - initially visible)
    { top: '5%', right: '18%', width: '195px', height: '155px', rotate: '8deg', zIndex: 3, animated: false },
    { top: '8%', right: '8%', width: '210px', height: '170px', rotate: '15deg', zIndex: 2, animated: false },
    
    // MIDDLE RIGHT (2 cards - delayed animation)
    { top: '30%', right: '4%', width: '200px', height: '160px', rotate: '18deg', zIndex: 2, animated: true },
    { top: '50%', right: '6%', width: '205px', height: '165px', rotate: '20deg', zIndex: 1, animated: true },
    
    // MIDDLE LEFT (2 cards - delayed animation)  
    { top: '30%', left: '4%', width: '195px', height: '155px', rotate: '-18deg', zIndex: 2, animated: true },
    { top: '50%', left: '6%', width: '210px', height: '170px', rotate: '-20deg', zIndex: 1, animated: true },
    
    // BOTTOM CORNERS (1 card - delayed animation, optional)
    { bottom: '8%', left: '12%', width: '190px', height: '150px', rotate: '-12deg', zIndex: 1, animated: true },
  ];

  visibleCardPositions: CardPosition[] = [];
  private animationTimeout?: any;

  ngOnInit(): void {
    // Show first 7 cards immediately (arc pattern at top)
    this.visibleCardPositions = this.allCardPositions.slice(0, 7);
    
    // Show remaining cards after 3 seconds with staggered animation
    this.animationTimeout = setTimeout(() => {
      this.showRemainingCards();
    }, 3000);
  }

  ngOnDestroy(): void {
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
  }

  private showRemainingCards(): void {
    const remainingCards = this.allCardPositions.slice(7);
    let delay = 0;
    
    remainingCards.forEach((card) => {
      setTimeout(() => {
        this.visibleCardPositions.push(card);
      }, delay);
      delay += 250; // 250ms stagger between each card
    });
  }

  getCardStyle(position: CardPosition): { [key: string]: string } {
    const styles: { [key: string]: string } = {
      width: position.width,
      height: position.height,
      transform: `rotate(${position.rotate})`,
      'z-index': position.zIndex.toString()
    };

    if (position.top) styles['top'] = position.top;
    if (position.left) styles['left'] = position.left;
    if (position.right) styles['right'] = position.right;
    if (position.bottom) styles['bottom'] = position.bottom;

    return styles;
  }

  onExpandClick(): void {
    console.log('Expand clicked');
  }

  onRefreshClick(): void {
    console.log('Refresh clicked');
    // Reset and restart animation
    this.visibleCardPositions = this.allCardPositions.slice(0, 7);
    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
    this.animationTimeout = setTimeout(() => {
      this.showRemainingCards();
    }, 3000);
  }

  onReadStoriesClick(): void {
    console.log('Read stories clicked');
  }
}